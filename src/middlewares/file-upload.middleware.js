import multer from "multer";

//Middleware to handle file - step 3
const storageConfig = multer.diskStorage({
    //destination tells multer where it exactly needs to store the file
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  //tels what should be name of file
  filename: (req, file, cb) => {
    const name = Date.now + "-" + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({ storage: storageConfig });
