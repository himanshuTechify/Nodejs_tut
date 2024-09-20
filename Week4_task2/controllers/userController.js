const {
  registerUserService,
  loginUserService,
  addPicService,
  getUserService,
  updateUserService,
  getAllUserService,
  updateUserPicService,
  forgotPasswordService,
  resetPasswordService,
} = require("../services/userServices");

const registerUser = async (req, res) => {
  try {
    const data = await registerUserService(req);

    res.status(201).json({
      message: "User registrated sucessfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token, email } = await loginUserService(req);
    res
      .status(200)
      .json({ message: "user logged in sucessfully", email: email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPicUser = async (req, res) => {
  try {
    const data = await addPicService(req);
    res.status(200).json({ message: "Pic uploaded sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const data = await getUserService(req);
    res
      .status(200)
      .json({ message: "user details fetched sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await updateUserService(req);
    res
      .status(200)
      .json({ message: "user details updated sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await getAllUserService(req);
    res
      .status(200)
      .json({ message: "user details updated sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserPic = async (req, res) => {
  try {
    const data = await updateUserPicService(req);
    res.status(200).json({ message: "user picture updated sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const data = await forgotPasswordService(req);
    res.status(200).json({ message: "reset password link sent on email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = await resetPasswordService(req);
    res.status(200).json({ message: "password updated sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addPicUser,
  getUser,
  updateUser,
  getAllUser,
  updateUserPic,
  forgotPassword,
  resetPassword,
};
