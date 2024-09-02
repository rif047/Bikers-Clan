const Auth = require("express").Router();
const { User } = require("../User/User_Model");
const bcrypt = require("bcrypt");
const JOI = require("joi");
const JWT = require('jsonwebtoken')


Auth.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });


        const { phone, password } = req.body;

        const user = await User.findOne({ phone });


        if (!user) {
            return res.status(401).json({ error: 'Invalid Phone Number' })
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' })
        }



        const token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).send({
            message: 'Login Successfull!',
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                alt_phone: user.alt_phone,
                shipping_address: user.shipping_address,
                address: user.address,
                role: user.role,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error logging in' })
    }
});


const validate = (data) => {
    const schema = JOI.object({
        phone: JOI.string().required().label("Phone Number"),
        password: JOI.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = Auth;