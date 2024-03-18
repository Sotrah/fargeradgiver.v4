import { v2 as cloudinary } from "cloudinary";
require('dotenv').config();
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api
.resources()
.then(result=>console.log(result));