import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const date = Date.now()

    cb(null, `${date}_${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
}

const limits = {
  fileSize: 1220485762312123
}

export default multer({
  storage,
  fileFilter,
  limits,
})