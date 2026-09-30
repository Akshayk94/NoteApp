const express=require("express");
const cors=require("cors");

const noteRoutes=require("./routes/noteRoutes");
const notFound=require("./middleware/notFound");
const errorHandler=require("./middleware/errorHandler");

const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL|| "http://localhost:5173"
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports=app;