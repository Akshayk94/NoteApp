const express=require("express");
const {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}=require("../controller/nodeController");

const router=express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

module.exports=router;