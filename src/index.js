// Initiate the connection to the database
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// import connect_DB from "./db";



// const app = express();

// this is an beginner approach to connect to the database
// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Ye le", error);
//             throw error
//         })

//       app.listen(process.env.PORT),()=>{
//         console.log(`app is running on port ${process.env.PORT}`)
//       }
         
//     } catch (error) {
//         console.log("Ye le ", error)
//     }
// })




// this is an advanced approach to connect to the database

import dotenv from 'dotenv';
import connect_DB from './db/index.js';
import app from './app.js'
// import express from 'express';

// You used the dotenv module to load environment variables from a .env file into process.env. This allows you to manage configuration settings outside of your code, making it easier to change settings without modifying the source code.
// const app = express();
dotenv.config({
    path: "./.env"
})
 

connect_DB()
.then((result) => {
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
    
}).catch((err) => {
    console.log("Mongo db conncetion failed",err)
});
