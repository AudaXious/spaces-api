import { v2 as cloudinary } from "cloudinary";
import CONFIG from "../../../config/default.js";

cloudinary.config({
  cloud_name: CONFIG.CLOUD_NAME ?? "",
  api_key: CONFIG.CLOUD_API_KEY ?? "",
  api_secret: CONFIG.CLOUD_API_SECRET ?? "",
});

const uploadToCloudinary = async (imagePath, filename) => {
  const options = {
    //   use_filename: true,
    public_id: filename,
    unique_filename: false,
    overwrite: true,
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      })
      .end(imagePath);
  });
};

const uploadSingleMedia = async (buffer, imagePath, imagePrefix) => {
  try {
      if (buffer === null) return;
      const url = await uploadToCloudinary(
        buffer,
        `${imagePath}/${imagePrefix}`
      );
   
      return url;
  } catch (error) {
    console.log("File could not be uploaded:" + error.message);
    throw error.message;
  }
};

export default uploadSingleMedia;
