import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db_connect.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});
connectDB();
 const app=express();
 const PORT=process.env.PORT||8000;
 //all apis
 app.use("/api/v1/user",userRoute);
 app.get("/home",(_,res)=>
{ 
    res.status(200).json({
        success:true,
        message:"Hello i am coming from Backened"
    })
})
 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

