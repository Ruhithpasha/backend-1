import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
            trim:true
        },
        avatar:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String,
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            unique:true,
            trim:true,
            lowercase:true
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        refreshToken:{
            type:String
        }

    },
    {
        timestamps:true
    }
)
// this is a middleware that will run before saving the user to the database
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
      return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next()
})
// this method  compares as=nd return true or false if the password is correct
userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}

// this method generates an access token
userSchema.methods.generateAccessToken = function(){
    return jwt .sign(
        { //payload
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },//secret key
        process.env.ACCESS_TOKEN_SECRET,
        {//options
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// this method generates a refresh token
 userSchema.methods.generaterefreshToken  =function (){
    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
 }
export const User = mongoose.model("User",userSchema);