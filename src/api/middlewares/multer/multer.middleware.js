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

const upload = multer({ storage: memoryStorage, fileFilter: fileFilter }).array(
  "media",
  4
);

export default upload;
