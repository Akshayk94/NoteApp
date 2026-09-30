const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength:[5, "Title must be at least 5 characters"],
            maxlength:[50, "Title can not exceed 50 characters"]
        },
        content:{
            type: String,
            required: [true, "Content is required"],
            trim: true
        },
        category:{
            type: String,
            default: "General",
            trim: true
        },
        color:{
            type:String,
            default:"light"
        },
        isPinned:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
);

const Note=mongoose.model("Note", noteSchema);
module.exports=Note;