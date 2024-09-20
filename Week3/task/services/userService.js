const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../helpers/generateToken");

const registrationService = async (user) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    role,
    isActive,
  } = user;

  const existUser = await User.findOne({ where: { email, isActive } });
  if (existUser) {
    throw new Error("User already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashPassword,
    phone,
    address,
    role,
    isActive,
  });
  return newUser;
};

const loginService = async (user) => {
  const { email, password } = user;

  const existUser = await User.findOne({ where: { email, isActive: "true" } });
  if (user && (await bcrypt.compare(password, existUser.password))) {
    const token = generateToken(
      existUser.userId,
      existUser.email,
      existUser.role
    );
    return token;
  } else {
    throw new Error("Enter correct email or password");
  }
};

const getAllUsersService = async () => {
  const data = await User.findAll({ where: { isActive: "true" } });
  return data;
};

const getUserService = async (userId) => {
  const data = await User.findOne({ where: { userId, isActive: "true" } });
  if (data) {
    return data;
  } else {
    throw new Error("User doesn't exist");
  }
};

const updateUserService = async (userId, userBody) => {
  const user = await User.findOne({ where: { userId, isActive: "true" } });
  if (!user) {
    throw new Error("user not existed");
  }
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    role,
    isActive,
  } = userBody;
  if (email && (await User.findOne({ where: { email, isActive: "true" } }))) {
    throw new Error("Email already existed");
  }

  let updatedPassword = user.password;
  if (password) {
    updatedPassword = await bcrypt.hash(password, 10);
  }

  await user.update({
    first_name: first_name || user.first_name,
    last_name: last_name || user.last_name,
    email: email || user.email,
    password: updatedPassword,
    phone: phone || user.phone,
    address: address || user.address,
    role: role || user.role,
    isActive: isActive || user.isActive,
  });
  return user;
};

module.exports = {
  registrationService,
  loginService,
  getAllUsersService,
  getUserService,
  updateUserService,
};
