const jwt = require('jsonwebtoken');
const UserModel = require('../app/models/UserModel');

const checkLogin = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from headers
            token = req.headers.authorization.split(' ')[1];
            //Verify token
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            //Get user from token
            req.user = await UserModel.findOne({username: decoded.username}).select('-password')
            
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({err: 'Chua dang nhap'});
        }
    }

    if(!token){
        res.status(401).json({err: 'no token'});
    }
}


const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({err:'chua dang nhap'});

    try {
        const decodeed =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodeed);

        return next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({err:'co mot loi gi do'});
    }
}
module.exports = {
    checkLogin,
    verifyToken,
}