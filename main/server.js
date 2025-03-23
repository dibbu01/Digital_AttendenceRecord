import express from "express";
import dotenv from "dotenv"
import authfunction from './routes/auth.route.js';
import connectdb from "./db/connectdb.js";
import studentattendance from './routes/studentdata.route.js'
import cookieParser from "cookie-parser";
//import cookieParser from "cookie-parser";
// import userfunction from './routes/user.route.js';
// import postfunction from './routes/post.route.js';
// import notificationfunction from './routes/user.notification.js'
// import cloudinary from 'cloudinary';
// import cors from "cors"
const app = express()
dotenv.config()
// cloudinary.config({
//     cloud_name :process.env.cloudinary_name,
//     api_key : process.env.cloudinary_API_KEY,
//     api_secret : process.env.cloudinary_API_SECRET_KEY
// })
app.use(cookieParser()); 

const port = process.env.port;
app.use(express.json(
    {
        limit : "7mb"
    }
))


import userRoutes from "./routes/user.routes.js";
app.use('/api/users', userRoutes);

import missionVisionRoutes from './routes/missionVision.routes.js';
app.use('/api', missionVisionRoutes);

import psoRoutes from './routes/pso.routes.js';
app.use('/api', psoRoutes)
import poRoutes from './routes/po.routes.js';
app.use('/api',poRoutes)
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
// }));

app.use(express.urlencoded({
    extended:true
}))

//app.use(cookieParser())
app.use('/api/auth',authfunction)
app.use('/api/student',studentattendance)
//app.use('/api/users',userfunction)
//app.use('/api/posts',postfunction)
//app.use('/api/notification',notificationfunction)
app.listen(port,()=>{
    console.log(`Server running successfully in port ${port}`)
    connectdb();
})