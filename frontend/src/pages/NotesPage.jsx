import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert, Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import {getNotes, deleteNote, togglePin} from "../services/noteService";
import { CATEGORIES } from "../utils/constants";
function NotesPage(){
    const location=useLocation();
    const navigate=useNavigate();

    const[notes, setNotes]=useState([]);
    const[loading, setLoading]=useState(true);
    const[error, setError]= useState("");

    const[searchText, setSearchText]=useState("");
    const[debouncedSearch, setDebouncedSearch]=useState("");
    const[category, setCategory]=useState("All");

    const[noteToDelete, setNoteToDelete] = useState(null);
    const[deleting, setDeleting]=useState(false);
    const[pinningId, setPinningId]=useState(null);

    const[successMsg, setSuccessMsg]=useState(location.state?.message|| "");

    //1) Clear the router state so the message doesn't return on refresh
    useEffect(()=>{
        if(location.state?.message) navigate(location.pathname,{replace:true, state:null});
    },[]);

    //2) Auto-hide the success message
    useEffect(()=>{
        if(!successMsg) return;
        const t=setTimeout(()=>setSuccessMsg(""),3000);
        return()=>clearTimeout(t);
    },[successMsg]);

    //3) Debounce search input
    useEffect(()=>{
        const t=setTimeout(()=>setDebouncedSearch(searchText), 400);
        return ()=> clearTimeout(t);
    },[searchText]);

    //4) Fetch Notes whenever search or category changes
    useEffect(()=>{
        let ignore=false;//prevents an older, slower response from overwriting a newer one
        const fetchNotes=async ()=>{
            setLoading(true);
            setError("");
            try {
                const data=await getNotes({search:debouncedSearch, category});
                if(!ignore) setNotes(data); 
            } catch (error) {
                if(!ignore) setError(error.message);
            } finally{
                if(!ignore) setLoading(false);
            }
        };

        fetchNotes();
        return ()=>{ignore=true;};
    },[debouncedSearch,category]);

    const handleTogglePin=async (note)=>{
        setPinningId(note._id);
        try {
            const updated=await togglePin(note);
            setNotes((prev)=>prev.map((n)=>(n._id===updated._id? updated:n)));
        } catch (error) {
            setError(error.message);
        }finally{
            setPinningId(null);
        }
    };

    const handleConfirmDelete=async ()=>{
        setDeleting(true);
        try {
            await deleteNote(noteToDelete._id);
            setNotes((prev)=>prev.filter((n)=>n._id!==noteToDelete._id));
            setSuccessMsg("Note Deleted Successfully");
            setNoteToDelete(null);
        } catch (error) {
            setError(error.message);
        } finally{
            setDeleting(false);
        }
    };

    const hasFilters=debouncedSearch.trim() !== "" || category!=="All";
    const pinnedNotes=notes.filter((n)=>n.isPinned);
    const otherNotes=notes.filter((n)=>!n.isPinned);

    const renderGrid=(list)=>(
       <Row className="g-3">
            {list.map((note)=>(
                <Col key={note._id} xs={12} sm={6} lg={4} xl={3}>
                    <NoteCard
                        note={note}
                        onDelete={setNoteToDelete}
                        onTogglePin={handleTogglePin}
                        pinning={pinningId===note._id}
                    />
                </Col>
            ))}
       </Row>
    );

    return(
        <Container className="py-4">
            <h2 className="mb-4"> 📘 MY NOTES</h2>
            {successMsg && <Alert variant="success" dismissible onClose={()=>setSuccessMsg("")}>
                {successMsg}</Alert>}
            {error && <Alert variant="danger" dismissible onClose={()=>setError("")}>
                {error}</Alert>}

            {/** Search + Filter */}
            <Row className="g-3 mb-4">
                <Col md={8}>
                    <InputGroup>
                        <InputGroup.Text>🔎</InputGroup.Text>
                        <Form.Control
                            placeholder="Search by title or content..."
                            value={searchText}
                            onChange={(e)=>setSearchText(e.target.value)}
                        />
                        {searchText && (
                            <Button variant="outline-secondary" 
                            onClick={()=>setSearchText("")}>⤫</Button>
                        )}
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <Form.Select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="All">
                            ALL CATEGORIES
                        </option>
                        {CATEGORIES.map((c)=>(
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            {/**Content */}
            {loading?(
                <LoadingState text="Loading notes..."/>
            ): notes.length===0?(
                <EmptyState hasFilters={hasFilters}/>
            ):(
                <>
                    {pinnedNotes.length>0 && (
                        <section className="mb-5">
                            <h5 className="mb-3">📌 Pinned({pinnedNotes.length})</h5>
                            {renderGrid(pinnedNotes)}
                        </section>
                    )}
                    {otherNotes.length>0 && (
                        <section className="mb-5">
                            <h5 className="mb-3">📝 Others({pinnedNotes.length})</h5>
                            {renderGrid(otherNotes)}
                        </section>
                    )} 
                </>
            )}
            <ConfirmDeleteModal
                show={!!noteToDelete}
                noteTitle={noteToDelete?.title}
                deleting={deleting}
                onCancel={()=>setNoteToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
}

export default NotesPage;