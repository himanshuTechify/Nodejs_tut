const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/tokenGeneration");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hasedPassword,
    });
    const token = generateToken(newUser.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async(req,res) => {
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user.id);
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in user', error });
    }
  };
}

module.exports = { registerUser,loginUser };
