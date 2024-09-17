const express = require("express");
const uploadFile = require("../controllers/fileController");

const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.single('file'), uploadFile);

module.exports = router;
