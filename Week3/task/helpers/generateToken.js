const jwt = require("jsonwebtoken");

const generateToken = (userId, userEmail, userRole) => {
  return jwt.sign(
    { id: userId, email: userEmail, role: userRole },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = generateToken;
