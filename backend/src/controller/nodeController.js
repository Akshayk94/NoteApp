const mongoose=require("mongoose");
const Note=require("../model/noteModel");

// GET /api/notes
const getAllNotes=async(req, res, next)=>{
    try {
        const{search, category}=req.query;
        const filter={};
        if(search){
           filter.$or=[
            {title:{$regex: search, $options:"i"}},
            {content:{$regex: search, $options:"i"}},
           ];
        }

        if(category && category!=="All"){
            filter.category=category;
        }

        const notes= await Note.find(filter).sort(
            {
                isPinned:-1,
                updatedAt:-1
            }
        );

        res.status(200).json({
            count:notes.length,
            data:notes
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/notes/:id
const getNoteById=async(req, res, next)=>{
    try {
        const {id} =req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid Note Id"
            });
        }
        const note=await Note.findById(id);

        if(!note){
            return res.status(404).json({
                message:"Note not found"
            });
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

//POST /api/notes
const createNote=async(req, res, next)=>{
    try {
        const{title, content, category, color}=req.body;

        const newNote=await Note.create({
            title,
            content,
            category,
            color
        });

        res.status(201).json({
            message:"Note Created Successfully",
            data:newNote
        });
    } catch (error) {
        next(error);
    }
}

// PUT /api/notes/:id
const updateNote=async(req,res,next)=>{
    try {
        const{id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid Note Id"
            });
        }

        const updatedNote=await Note.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new:true, runValidators:true}
        );

        if(!updatedNote){
            return res.status(404).json({
                message:"Note not found"
            });
        }

        res.status(200).json({
            message:"Note updated successfully",
            data: updatedNote
        });
    } catch (error) {
        next(error);
    }
};

//DELETE /api/notes/:id
const deleteNote=async(req,res,next)=>{
    try {
        const{id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid Note Id"
            });
        }

        const deletedNote=await Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).json({
                message:"Note not found"
            });
        }

        res.status(200).json({
            message:"Note deleted successfully",
            data: deletedNote
        });

    } catch (error) {
        next(error);
    }
};

module.exports={
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};