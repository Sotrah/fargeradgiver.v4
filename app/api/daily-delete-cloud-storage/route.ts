import { v2 as cloudinary } from "cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
      const result = await cloudinary.api.root_folders();
      return Response.json(result);
  } catch (error) {
      console.error('Error fetching root folders from Cloudinary:', error);
      throw new Error('An error occurred while fetching root folders');
  }
}