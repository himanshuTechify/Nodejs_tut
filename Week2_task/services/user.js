var fs = require("fs");
const { emitWarning } = require("process");
const { v4: uuid } = require("uuid");

const readData = () => {
  try {
    const data = fs.readFileSync("./users.json");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));
};

const getAllUserService = (isActive) => {
  const users = readData();
  if (isActive) {
    const activeUsers = users.filter((user) => user.is_active === "true");
    return activeUsers;
  } else {
    return users;
  }
};

const getUserService = (id) => {
  const users = readData();
  const user = users.find((user) => user.id === id);
  if (user && user.is_active === "true" && user.is_deleted === "false") {
    return user;
  } else {
    throw new Error("user not existed");
  }
};

const addUserService = (user) => {
  const users = readData();
  const index = users.findIndex((u) => u.email === user.email);
  const data = users[index];

  if (
    index !== -1 &&
    data.is_active === "true" &&
    data.is_deleted === "false"
  ) {
    throw new Error("Email already exist");
  } else {
    const newUser = {
      id: uuid(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };
    newUser["is_active"] = "true";
    newUser["is_deleted"] = "false";
    users.push(newUser);
    writeData(users);
    return newUser;
  }
};

const updateUserService = (id, user) => {
  const Users = readData();
  const index = Users.findIndex((u) => u.id === id);
  if (index !== -1) {
    const data = Users[index];
    if (data.is_active === "true" && data.is_deleted === "false") {
      if (user.email) {
        const anyUser = Users.find((u) => u.is_active === "true" && u.email === user.email);
        if (anyUser) {
          throw new Error("Please enter different email");
        }
      }
      Users[index] = {
        ...data,
        ...user,
      };
    } else {
      throw new Error("User Not found");
    }
  }
  writeData(Users);
  return Users[index];
};

module.exports = {
  getAllUserService,
  getUserService,
  addUserService,
  updateUserService,
};
