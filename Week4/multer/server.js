const express= require('express');
const multer= require('multer');
const path = require('path');

const app =  express();

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null, './uploads/');
    },
    filename : function(req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage,
    limits : { fileSize : 1000000},
    fileFilter : function(req,file,cb) {
        checkFileType(file,cb);
    }
}).single('myFile');


function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check extension
    const mimetype = filetypes.test(file.mimetype); // Check MIME type
  
    if (mimetype && extname) {
      return cb(null, true); // Pass validation
    } else {
      return cb(new Error('Error: Images Only!')); // Fail validation
    }
  }


app.post('/upload', (req,res) => {
    upload(req,res, (err) => {
        if(err){
            res.status(400).json({error : err});  
        }else{
            if(req.file === undefined){
                res.status(400).json({ message : "No file selected"})
            }else{
                res.status(200).json({ message : "file uploaded sucessfully",
                    file : `uploads/${req.file.filename}`
                })
            }
        }
    })
})


app.use('/uploads', express.static('uploads'));

app.listen(6000, () => {
  console.log('Server started ');
});