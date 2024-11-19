
// Explanation for below function

// asyncHandler is a higher-order function that takes a requestHandler function as an argument.
// It returns a new function that takes req, res, and next as arguments.
// Inside the returned function, it calls the requestHandler and wraps it in Promise.resolve().
// If the requestHandler throws an error or returns a rejected promise, the .catch block catches the error and passes it to the next function, which is the Express error handler.
// // This allows you to handle errors in asynchronous route handlers without having to use try-catch blocks in each route.


//this is a helper function that will be used to handle async functions in the routes
const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next
        (err))

    }
     
}


// Below function is another method to write the above function

// const asyncHandler = (func)=>async (req,res,next)=>{

//     try {
//         await func(req,res,next)

//     } catch (error) {
//         res.status(500 ||error.code).json({
//             success:false,
//             message:error.message
//         })

//     }

// }
 
export default asyncHandler;