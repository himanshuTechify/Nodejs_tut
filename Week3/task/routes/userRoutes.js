const express = require("express");
const { registerUser, loginUser,getAllUsers,getUser, updateUser, deleteUser } = require("../controllers/userContorller");
const validate = require("../middlewares/validateMiddleware");
const { userSchema } = require("../validators/validationSchema");
const loginSchema = require("../validators/loginSchema");
const {protect, admin,isValidUser} = require("../middlewares/authMiddleware")


const router = express.Router();

router
  .post("/register", validate(userSchema, "body"), registerUser)
  .post("/login", validate(loginSchema, "body"),loginUser)
  .get("/all",protect,admin, getAllUsers)
  .get("/:id", protect,isValidUser, getUser)
  .patch("/:id",protect,admin, updateUser)
  .delete("/:id",protect,admin, deleteUser)




module.exports = router;


