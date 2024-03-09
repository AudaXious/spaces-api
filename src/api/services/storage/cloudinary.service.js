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

const uploadMedia = async (req, imagePath, imagePrefix) => {
  try {
    const files = req.files;
    if (files.length < 1) throw new Error("No media");
    let imageUrls = [];
    
    //
    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      let imageName;
      
      imageName = imagePrefix;
      if(files.length > 1){
        imageName = `${imagePrefix}[${i}]`;
      }
      const url = await uploadToCloudinary(
        f.buffer,
        `${imagePath}/${imageName}`
      );
      imageUrls.push({url : url.secure_url, mime : f.mimetype});
    }
    return imageUrls;
  } catch (error) {
    console.log("File could not be uploaded:" + error.message);
  }
};

export default uploadMedia;
