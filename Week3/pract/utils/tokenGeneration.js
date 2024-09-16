const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  console.log(process.env.JWT_SERCRET);
  return jwt.sign({ id }, process.env.JWT_SERCRET, { expiresIn: "1h" });
};

module.exports = generateToken;
