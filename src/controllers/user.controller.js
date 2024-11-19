// import asyncHandler from '../utils/asyncHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
// below function is used to register a user
// The registerUser function is created in the src/controllers/user.controller.js file. The registerUser function is an asynchronous function that takes the request and response objects as arguments. The registerUser function sends a response with a status code of 200 and a JSON object with a message property set to "ok".


// this is a controller function to register a user
const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})


export default registerUser;