const errorHandler=(err,req,res,next)=>{
    console.error(err.stack);

    //Mongoose duplicate key error
    if(err.code===11000){
        return res.status(409).json({
            message:"Duplicate value entered",
            field:Object.keys(err.keyValue)[0]
        });
    }

    //Mongoose validation error
    if(err.name==="ValidationError"){
        return res.status(400).json({
            message:"Validation Failed",
                errors: Object.values(err.errors).map((validationError)=>validationError.message)
        });
    }

    res.status(err.statusCode || 500).json({
        message:err.message||"Server error"
    });
};
module.exports=errorHandler;