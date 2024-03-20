import { v2 as cloudinary } from "cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function callback(result: any){
  console.log(result);
  if (result.partial === true) {
      console.log('More than 1000 images to delete, running delete function again');
      GET();
  }
  else {
      console.log('Less than 1000 images deleted, none leftover');
  }
}

export async function GET() {
  try {
    const result = await cloudinary.api.delete_resources_by_tag('colorchangesigned')
    callback(result);
    return Response.json(result);
  } catch (error) {
      console.error('Error deleting tagged files:', error);
      throw new Error('An error occurred while deleting tagged files');
  }
}