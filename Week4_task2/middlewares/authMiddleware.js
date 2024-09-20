const jwt = require('jsonwebtoken');


const protect = (req,res,next) => {
    let token;
    console.log("here is it")
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json( { message : "token failed, not authorized"});
        }
    }else{
        res.status(401).json( { message : "No token, please login to acess route"})
    }
};


const isAdmin = (req,res,next) => {
    if(req.user &&  req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json( { message : "only admin can acess"})
    }
}

const validUser = (req,res,next) => {
    if(req.user && (req.user.id === req.params.id || req.user.role === 'admin')){
        next();
    }else{
        res.status(403).json( { message : "only admin and user itself can acess"})
    }
}

const isUser = (req,res,next) => {
    if(req.user &&  req.user.role === 'user'){
        next();
    }else{
        res.status(403).json( { message : "only user itself can acess"})
    }
}


module.exports = {protect, validUser, isAdmin, isUser};