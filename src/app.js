import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
// app.use is used when we want to use a middleware in our applications or when we need to do a configuration settings in our application.
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))


// CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to control how web pages can request resources from a different domain than the one that served the web page. It is a mechanism that allows servers to specify who can access their resources and how those resources can be accessed.

 app.use(express.json({limit:"32kb"}))
 // limiting the size of the json data that can be sent to the server - Prevents server from crashing
 app.use(express.urlencoded({extended:true,limit:"32kb"}))
 //above line is used to limit the size of the data that can be sent to the server through the url encoding
 app.use(express.static("public"))
 //public is the name of the folder where all the static files are stored like images, videos, etc.
 app.use(cookieParser())
 // above line is used to add cookies and modify it from my server to users browser and perform crud  operations on it.


 //routes import

 import userRouter from './routes/user.routes.js';

 // routes declaration

 app.use('/api/v1/users',userRouter)


export default app;
