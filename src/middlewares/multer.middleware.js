import multer from "multer";

// Multer middleware
// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. Multer is used to handle file uploads in the application. The multer middleware is created in the middlewares/multer.middleware.js file. The multer middleware is configured to store the uploaded files in the public/temp directory. The multer middleware is exported from the file so that it can be used in other files.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/temp");
  }, //The destination function is used to specify the directory where the uploaded files will be stored. In this case, the uploaded files will be stored in the public/temp directory.
  filename: function (req, file, cb) {
    // this function takes the original name from the file that is being uploaded and gives it to the call back function
    cb(null, file.originalname);
  },
});
// paramaeter is destination function
// req = stores the http request and response
// file = stores the file that is being uploaded
// cb = specifies the path where the file will be stored and the null indicates that there is no error
export const upload = multer({
  storage,
});

// In this way, the multer middleware is created in the middlewares/multer.middleware.js file. The multer middleware is configured to store the uploaded files in the public/temp directory. The multer middleware is exported from the file so that it can be used in other files
