import multer from "multer";

const fileFilter = (_, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg"   
    ) {
    return cb(null, true);
  }
  cb(null, false);
};

const memoryStorage = multer.memoryStorage();

const upload = multer({ 
  storage: memoryStorage, 
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: "banner", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);

export default upload;
