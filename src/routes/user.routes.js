import { Router } from "express";
import  registerUser  from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

// adding the multers middleware to the route
const router = Router();
router.route("/register").post(
    //injecting the middleware before the .post method above is executed
upload.fields([
    {name:"avatar",
    maxcount:1},
    {
        name:"coverimage",
        maxCount:1
    }
    //the middleware is injected here to handel the image uploads and avatar uploads it ensures the files are processed and available in the request object before the controller function is executed
]) ,   
    registerUser
)


export default router;