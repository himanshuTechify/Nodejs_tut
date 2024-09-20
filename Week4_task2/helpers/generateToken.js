const jwt = require('jsonwebtoken');

const generateToken = (userId, userEmail, userRole) => {
    return jwt.sign( {
        id : userId, email : userEmail, role : userRole
    }, process.env.SECRET_KEY, { expiresIn : '1h'})
};

const generateTokenForPassword = (email) => {
    return jwt.sign( {email}, process.env.SECRET_KEY, { expiresIn : '1h'})
}

module.exports = {generateToken, generateTokenForPassword};