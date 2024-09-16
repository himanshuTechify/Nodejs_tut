const jwt = require("jsonwebtoken");


const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token Failed, Not authorized" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token, Please log in to get acess" });
  }
};

const admin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ messsage: "Admin acess only" });
  }
};

const isValidUser = async (req, res, next) => {
  if(req.user && (req.user.role === 'admin' || req.user.id === req.params.id)){
    next();
  }else{
    return res.status(403).json({message : "Only admin or user itself can acess" })
  }
};

module.exports = { protect, admin ,isValidUser};
