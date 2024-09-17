
const path = require("path");
const File = require("../models/fileModel");
const sendEmailWithAttachment = require("../services/emailService");
const fs = require('fs');


const uploadFileService = async (req) => {
  try {
    const newFile = await File.create({
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    await sendEmailWithAttachment(
      "mandaviyahimanshu@gmail.com",
      "File Uploaded",
      "Find the attached which you have uploaded",
      newFile.filename
    );

    fs.unlink( req.file.path, (err) => {
        if(err){
            console.error("error while deleting file", err)
        }else{
            console.log("file deleted sucessfully")
        }
    })
    return newFile;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = uploadFileService;
