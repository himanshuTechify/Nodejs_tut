const {
  generateToken,
} = require("../helpers/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const File = require("../models/fileModel");
const { sequelize } = require("../db");
const queries = require("../query/query");
const { sendEmail } = require("../services/sendMailService");
const {Op} = require('sequelize')

const registerUserService = async (req) => {
  const { first_name, last_name, email, password, phone, address, role } =
    req.body;

  const existUser = await User.findOne({
    where: { email, is_active: true, is_deleted: false },
  });
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
  });

  await sendEmail(
    "mandaviyahimanshu@gmail.com",
    "Registration Sucessfull",
    `you have sucessfully registrated with username ${newUser.first_name} ${newUser.last_name}`
  );
  return newUser;
};

const loginUserService = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email, is_active: true, is_deleted: false },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("incorrect email or password");
  }
  const token = generateToken(user.uuid, user.email, user.role);

  return { email: user.email, token };
};

const addPicService = async (req) => {
  const user = await User.findOne({
    where: { uuid: req.params.id, is_active: true, is_deleted: false },
  });
  if (!user) {
    throw new Error("user doesn't exist");
  }

  const newFile = await File.create({
    userId: user.id,
    filename: req.file.filename,
    filesize: req.file.size,
    mimetype: req.file.mimetype,
  });

  return newFile;
};

const getUserService = async (req) => {
  const userId = req.params.id;

  const [result] = await sequelize.query(queries.getUserQuery, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT,
  });

  if (!result) {
    throw new Error("user dosen't exist");
  }

  return result;
};

const updateUserService = async (req) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    role,
    is_active,
    is_deleted,
  } = req.body;

  const user = await User.findOne({
    where: { uuid: req.params.id, is_active: true, is_deleted: false },
  });
  if (!user) {
    throw new Error("user dosen't exist");
  }
  if (
    email &&
    (await User.findOne({
      where: { email, is_active: true, is_deleted: false },
    }))
  ) {
    throw new Error("email already exist");
  }

  let hashPassword = user.password;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  await user.update({
    first_name: first_name || user.first_name,
    last_name: last_name || user.last_name,
    email: email || user.email,
    password: hashPassword,
    phone: phone || user.phone,
    address: address || user.address,
    role: role || user.role,
    is_active:
      is_active !== undefined && is_active !== null
        ? is_active
        : user.is_active,
    is_deleted:
      is_deleted !== undefined && is_deleted !== null
        ? is_deleted
        : user.is_deleted,
  });

  return user;
};

const getAllUserService = async (req) => {
  const {
    search,
    sort = "id",
    order = "ASC",
    page = 1,
    perpage = 10,
  } = req.query;

  let searchCondition = ``;
  if (search) {
    searchCondition = `AND (u.first_name ILIKE '%${search}%' OR u.last_name ILIKE '%${search}%' 
    OR u.phone ILIKE '%${search}%' OR u.email ILIKE '%${search}%' )`;
  }

  const sortField = ["first_name", "last_name", "email", "phone"].includes(sort)
    ? sort
    : "id";
  const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const limit = parseInt(perpage, 10) || 10;
  const offset = (parseInt(page, 10) - 1) * limit;

  const qu = queries.getAllUserQuery
    .replace(":searchCondition", searchCondition)
    .replace(":sortField", sortField)
    .replace(":sortOrder", sortOrder)
    .replace(":limit", limit)
    .replace(":offset", offset);

  console.log(qu);
  const allUser = await sequelize.query(qu, {
    type: sequelize.QueryTypes.SELECT,
  });

  const countUser = await sequelize.query(
    queries.getUserCount.replace(":searchCondition", searchCondition),
    { type: sequelize.QueryTypes.SELECT }
  );

  const totalUsers = parseInt(countUser[0].count, 10);

  return {
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    perPage: limit,
    currentPage: parseInt(page, 10),
    allUser,
  };
};

const updateUserPicService = async (req) => {
  const user = await User.findOne({
    where: { uuid: req.params.id, is_active: true, is_deleted: false },
  });

  if (!user) {
    throw new Error("user donen't exist");
  }

  const existFile = await File.findOne({ where: { userId: user.id } });
  if (!existFile) {
    throw new Error("user pic doesn't exist");
  }

  const userId = existFile.userId;

  const newFile = await sequelize.query(queries.updateUserPicQuery, {
    replacements: {
      userId: existFile.userId,
      filename: req.file.filename,
      filesize: req.file.size,
      mimetype: req.file.mimetype,
    },
    type: sequelize.QueryTypes.UPDATE,
  });

  return newFile;
};

const forgotPasswordService = async (req) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email, is_active: true, is_deleted: false },
  });
  if (!user) {
    throw new Error("user doesn't exist");
  }

  const token = Math.random().toString(36).slice(-8);
  const expiry = Date.now() + 3600000;

  await user.update({
    resettoken: token,
    resettokenexpiry: expiry,
  });

  const resetLink = `http://localhost:3000/api/user/reset-password?email=${user.email}&token=${token}`;

  await sendEmail(
    "mandaviyahimanshu@gmail.com",
    "reset password link",
    `if you want to reset your password
    then click below link : ${resetLink}`
  );
  return;
};

const resetPasswordService = async (req) => {
  const { email, token, password } = req.body;

  const user = await User.findOne({ where : {
    email,
    resettoken: token,
    resettokenexpiry: { [Op.gt]: Date.now() },
    is_active: true,
    is_deleted: false,
  }});

  if (!user) {
    throw new Error("invalid user or token expired");
  }

  const newPassword = await bcrypt.hash(password, 10);

  await user.update({
    password: newPassword,
    resettoken: null,
    resettokenexpiry: null,
  });

  return;
};

module.exports = {
  registerUserService,
  loginUserService,
  addPicService,
  getUserService,
  updateUserService,
  getAllUserService,
  updateUserPicService,
  forgotPasswordService,
  resetPasswordService,
};
