const API_URL=`${import.meta.env.VITE_API_URL}/notes`;

//shared helper: sends request, parses JSON, throws readable error

const request= async(URL, options={})=>{
    const response = await fetch(URL, {
        headers:{"Content-Type":"application/json"},
        ...options
    });

    const data=await response.json().catch(()=>({}));

    if(!response.ok){
        //Backend sends {message} or {message, errors:[...]}
        const message=data.errors?.join(",")||data.message||"Something went wrong";
        throw new Error(message);
    }
    return data;
};

// GET /api/notes?search=&category=

export const getNotes= async(
    {search="", category="All"}={})=>{
        const params=new URLSearchParams();
        if(search.trim()) params.set("search",search.trim());
        if(category!=="All") params.set("category",category);
        const query=params.toString();
        const result=await request(query?`${API_URL}?${query}`:API_URL);
        return result.data; //array of notes
};

// GET /api/notes/:id (backend returns the note directly)

export const getNoteById=(id)=>
    request(`${API_URL}/${id}`);

// POST /api/notes
export const createNote=async(noteData)=>{
    const result=await request(API_URL,{
        method:"POST",
        body: JSON.stringify(noteData)
    });
    return result.data;
};

//PUT /api/notes/:id (also used for pin/unpin)
export const updateNote=async(id,noteData)=>{
    const result=await request(`${API_URL}/${id}`,{
        method:"PUT",
        body:JSON.stringify(noteData)
    });
    return result.data;
};

// DELETE /api/notes/:id
export const deleteNote=(id)=>
    request(`${API_URL}/${id}`,{method:"DELETE"});

// Pin/Unpin is just partial update
export const togglePin=(note)=>
    updateNote(note._id, {isPinned:!note.isPinned});


