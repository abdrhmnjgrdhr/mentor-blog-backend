import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import UserRoutes from "./routes/user.route.js"
import AuthRoutes from "./routes/auth.route.js"
dotenv.config();

const app=express();
app.use(express.json())
mongoose.
connect(process.env.MONGODB).then(()=>{
    console.log("database is coonected");
}).catch((err)=>{
    console.log(err.message);
})


app.use('/api/user',UserRoutes)
app.use('/api/auth',AuthRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})