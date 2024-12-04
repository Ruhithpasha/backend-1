// import asyncHandler from '../utils/asyncHandler.js';
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

// the below line is used to generate the access token

const generateAccessTokenAndRefreshToken = async(userId)=>{
try {
  const user = await  User.findById(userId)
  const accessToken = generateAccessToken();
  const refreshToken = generaterefreshToken();

  user.refreshToken = refreshToken;
 await user.save({validateBeforeSave : false})
  return{ accessToken , refreshToken}
} catch (error) {
  throw new ApiError(500,"Oops something went wrong")
}
}


// below function is used to register a user
// The registerUser function is created in the src/controllers/user.controller.js file. The registerUser function is an asynchronous function that takes the request and response objects as arguments. The registerUser function sends a response with a status code of 200 and a JSON object with a message property set to "ok".

// this is a controller function to register a user
const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "ok",
  // });
  //getting user details from frontend
  const { fullname, email, password, username } = req.body;
  // console.log(req.body)
  // console.log("email:", email);

  // validating the user details that are not empty
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }
  // checking if the user already exists in the database

 const existedUser = await User.findOne({
    // the $or operator performs a logical OR operation on an array of two or more expressions and selects the documents that satisfy at least one of the expressions. this is specially used to check if the user already exists in the database
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }
  // By the below code we are checking for images and avatars and getting the local path of the images and avatars that are uploaded by user and storing them in the variables avatarLocalPath and coverImageLocalPath

  // this is necessary to access the files that are uploaded by the user
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files)
  // console.log(avatarLocalPath);
  // below line is used to check wheather the avatar is available or not
  // const avatarLocalPath = req.files?.avatar && req.files.avatar.length > 0 ? req.files.avatar[0].path : undefined;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  const coverImageLocalPath = req.files?.coverImage && req.files.coverImage.length > 0 ? req.files.coverImage[0].path : undefined;

  // checking avatar properly that we are getting it ao not

  if (!avatarLocalPath) {
    throw new ApiError(400, " Please upload an avatar");
  }
  // uploading the avatar and cover image to cloudinary by calling the uploadOnCloudinary function
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // checking if the avatar is uploaded successfully or not because it is a mandatory field and if it is not uploaded successfully then the database will crash
  if (!avatar) {
    throw new ApiError(500, "Avatar not uploded please check and reupload");
  }
  // creating a user object with all the check data and saving it to the database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //removing the password and refresh token field from the response
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  // checking if the user is created successfully or not
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // returning the response with status code 200 and user object
  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async(req,res)=>{
 const {email , username , password} = req.body

 if (!username || !email) {
  throw new ApiError(400,"Username or email is required")
 }
// User.findOne returns the first thing that it finds in the database
const userReturned= await User.findOne({
  // this below line return either username or email by finding anyone of it in the database and the $or operator is  a mongodb operator 
  $or :[{username},{email}]
})

if (!userReturned) {
  throw new ApiError(404,"User does not exit");
}

const isPasswordValid = await userReturned.isPasswordCorrect(password)
     
if (!isPasswordValid) {
  throw new ApiError(401,"Password is not valid ");
  
}
  // accessing the generateAccessTokenand refreshtoken method 
const {accessToken,refreshToken} = generateAccessTokenAndRefreshToken(User._id)

// this below line is used to send the cookies data to logged in user
       
const loggedInUser = await User.findById(User._id).select("-password -refreshToken")

})

export {
  registerUser,
  loginUser
}

// Steps to register a user
// 1. Create a controller function in the src/controllers/user.controller.js file.
// 2. Import the asyncHandler function from the src/utils/asyncHandler.js file.
// 3. Create a registerUser function that takes the request and response objects as arguments.
// 4. Send a response with a status code of 200 and a JSON object with a message property set to "ok".
// 5. Export the registerUser function from the src/controllers/user.controller.js file.
// 6. Import the registerUser function in the src/routes/user.routes.js file.
// 7. Use the registerUser function as the controller function for the POST /api/users/register route.
// 8. Test the POST /api/users/register route using Postman.
// 9. Verify that the response has a status code of 200 and a JSON object with a message property set to "ok".
// 10. Commit the changes and push to GitHub.
// 11. Create a pull request and merge the changes to the main branch.
// 12. Verify that the changes are reflected in the main branch.
// 13. Proceed to the next task

//main algorithm to resister a user
//get the details of user from frontend and add midleware to handle image uploads in route.js
//validate the user details -not empty,valid email,valid password
//check if the user already exists in the database
//if user exists,send an error message
//check for images and avtar
// upload them to cloudinary
//if user does not exist,create a new user object - create entry db(giving creation call)
//hash the password
//save the user to the database
//remove password and refresh token field from the response
//check for user creation
//return response with status code 200 and user object
