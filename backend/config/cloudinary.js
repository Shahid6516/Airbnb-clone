import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) return null;

  // Ensure the file path is absolute
  const absolutePath = path.isAbsolute(filepath)
    ? filepath
    : path.join(process.cwd(), filepath);

  try {
    const uploadResult = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    // Remove local file after successful upload
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Safely remove the file if it exists
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    throw error;
  }
};

export default uploadOnCloudinary;
