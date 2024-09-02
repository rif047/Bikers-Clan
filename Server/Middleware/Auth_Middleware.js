const { User } = require('../API/User/User_Model');
const JWT = require('jsonwebtoken');


const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        if (user.role !== 1) {
            return res.status(401).send({ message: "Unauthorized Access! User is not an Admin" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in Admin Middleware" });
    }
};



module.exports = { requireSignIn, isAdmin };