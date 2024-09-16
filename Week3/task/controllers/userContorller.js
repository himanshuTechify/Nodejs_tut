const {
  registrationService,
  loginService,
  getAllUsersService,
  getUserService,
  updateUserService
} = require("../services/userService");


const registerUser = async (req, res) => {
  try {
    const data = await registrationService(req.body);
    res
      .status(201)
      .json({ message: "User Registered SucessFully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.status(200).json({ message: "Login sucessfull", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await getAllUsersService();
    res.status(200).json({ message: "users fetched sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const data = await getUserService(req.params.id);
    res.status(200).json({ message: "user details fetched sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req,res) => {
    try {
        const data = await updateUserService(req.params.id, req.body)
        res.status(200).json({ message: "user details updated", data : data});
    } catch (error) {
        res.status(500).json( { error : error.message})
    }
}

const deleteUser = async (req,res) => {
    try {
        const data= await updateUserService(req.params.id, {isActive : "false"})
        res.status(200).json({ message: "user deleted sucessfully", data : data});
    } catch (error) {
        res.status(500).json( {error : error.message})
    }
}

module.exports = { registerUser, loginUser, getAllUsers, getUser, updateUser,deleteUser };
