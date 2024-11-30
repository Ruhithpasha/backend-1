import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';


// in this  way the cloudinary configuration is done in the services/cloudinary.js file and the uploadOnCloudinary function is created to upload the file on cloudinary. The function takes the local file path as an argument and returns the response from cloudinary if the file is uploaded successfully. If the file is not uploaded successfully, the function returns null. The local file is deleted after the file is uploaded successfully or if the file is not uploaded successfully. The function is exported from the file so that it can be used in other files.
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const uploadOnCloudinary = async (localFilePath)=>{
        try {
            if (!localFilePath){
                return null         
            }
            const response =await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            // console.log("The file is uploaded successfully on cloudinary",response.url);
            
            // console.log(`${response}`)
            fs.unlinkSync(localFilePath)
            return response;
        } catch (error) {
                   fs.unlinkSync(localFilePath);//removes the locally saved temporary file as the upload operation got failed
                   return null;
            
        }
    }


    export {uploadOnCloudinary};