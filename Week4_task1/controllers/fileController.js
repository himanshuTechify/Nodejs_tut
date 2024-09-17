const uploadFileService = require("../services/uploadFileService");

const uploadFile = async (req, res) => {
  try {
    const data = await uploadFileService(req);
    res
      .status(200)
      .json({ message: "file sucessfully uploaded and sent mail", file: data });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error in sending mail or uploading file",
        error: error.message,
      });
  }
};

module.exports = uploadFile;
