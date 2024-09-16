const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const protect  = async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startswith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SERCRET);
        req.user = await User.findByPk(decode.id);
        next();
    }
    if(!token){
        res.status(401).json({message : "user not authorized"})
    }
}

module.exports = {protect}