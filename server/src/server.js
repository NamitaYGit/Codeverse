import express from "express";
import dotenv from "dotenv";
import cookieParser  from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db_connect.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js"
import mediaRoute from "./routes/media.route.js";
dotenv.config({});
connectDB();
 const app=express();
 const PORT=process.env.PORT||8000;
 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
   allowedHeaders: ["Content-Type", "Authorization"]
 }));
 app.use(express.json());
 app.use(cookieParser());
// apis
app.use("/api/v1/media",mediaRoute);
 app.use("/api/v1/user",userRoute);
 app.use("/api/v1/course",courseRoute);
 app.use("/api/v1/purchase",purchaseRoute);

 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

