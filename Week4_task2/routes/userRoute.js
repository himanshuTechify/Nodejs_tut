const express = require("express");
const {
  registerUser,
  loginUser,
  addPicUser,
  getUser,
  updateUser,
  getAllUser,
  updateUserPic,
  forgotPassword,
  resetPassword
} = require("../controllers/userController");
const validate = require("../middlewares/validateMiddleware");
const registrationSchema = require("../validators/registrationSchema");
const upload = require("../middlewares/upload");
const loginSchema = require("../validators/loginSchema");
const {
  protect,
  validUser,
  isAdmin,
  isUser,
} = require("../middlewares/authMiddleware");
const path = require('path')

const router = express.Router();

router
  .post("/register", validate(registrationSchema, "body"), registerUser)
  .post("/login", validate(loginSchema, "body"), loginUser)
  .post("/addpic/:id", protect, validUser, upload.single("file"), addPicUser)
  .get("/user-by-id/:id", protect, validUser, getUser)
  .get("/all", protect, isAdmin, getAllUser)
  .patch("/:id", protect, validUser, updateUser)
  .patch("/userpic/:id",protect, isUser,upload.single("file"), updateUserPic)
  .get("/forgot-password", (req, res) => {
    res.render('forgotPassword');
  })
  .post("/forgot-password", forgotPassword)
  .get("/reset-password", (req,res) => {
    const {email, token} = req.query;

    res.render('resetPassword', {email,token});
  })
  .post("/reset-password", resetPassword)
  

module.exports = router;
