const { use } = require("../routes/user");
const {
  getAllUserService,
  getUserService,
  addUserService,
  updateUserService,
} = require("../services/user");

const addUser = (req, res) => {
  try {
    const user = req.body;
    const data = addUserService(user);
    res.status(200).json({ msg: "sucessfully added", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getUserService(id);
    res.status(200).json({ msg: "User sucessfully fetced", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const all = req.query.all;
    console.log(all);
    let active
    if (all === "true") {
      console.log("here");
      active = false
    } else {
        active = true
    }
    const data = await getAllUserService(active);
    res.status(200).json({ msg: "sucessful", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const data = await updateUserService(id, user);
    res.status(200).json({ msg: "User updated sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = {
      is_active: "false",
      is_deleted: "true",
    };
    const data = await updateUserService(id, user);
    res.status(200).json({ msg: "user deleted sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addUser, getAllUser, getUser, updateUser, deleteUser };
