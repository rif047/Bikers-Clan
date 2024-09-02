const { User, validate } = require('../User/User_Model');
const Bcrypt = require("bcrypt");


const Customers = async (req, res) => {
    const Data = await User.find();
    res.json(Data)
}



const Create = async (req, res) => {
    try {
        const { name, phone, alt_phone, email, address, shipping_address, password, repeat_password, answer, role } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const checkPhone = await User.findOne({ phone });
        // const checkEmail = await User.findOne({ email });

        if (checkPhone) return res.status(400).send({ message: 'Phone Number already exists!' });
        // if (checkEmail && checkEmail.email) { return res.status(400).send({ message: 'Email already exists!' }); }

        const commonPassword = "bikersclan";

        const commonPasswordBcrypt = await Bcrypt.hash(commonPassword, 8);

        const passwordBcrypt = await Bcrypt.hash(password || commonPassword, 10);

        const newUser = new User({
            name,
            phone,
            alt_phone: alt_phone ? alt_phone : phone,
            email: email ? email : 'bikersclan.bd@gmail.com',
            address,
            shipping_address: shipping_address ? shipping_address : address,
            password: password ? passwordBcrypt : commonPasswordBcrypt,
            repeat_password: repeat_password ? passwordBcrypt : commonPasswordBcrypt,
            answer: answer ? answer.toLowerCase() : 'bikersclan',
            role: role ? role : 0
        });

        await newUser.save();
        res.status(201).send(newUser);

    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}




const View = async (req, res) => {
    const viewOne = await User.findOne({ phone: req.params.phone });
    res.send(viewOne)
}



const Update = async (req, res) => {
    try {
        const { name, phone, alt_phone, email, address, shipping_address, password, repeat_password, answer, role } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const checkPhone = await User.findOne({ phone: phone, _id: { $ne: req.params.id } });

        if (checkPhone) return res.status(400).send({ message: 'Phone Number already exists!' });

        const updateUser = await User.findById(req.params.id);

        updateUser.name = name;
        updateUser.phone = phone;
        updateUser.alt_phone = alt_phone;
        updateUser.email = email.toLowerCase();
        updateUser.address = address;
        updateUser.shipping_address = updateUser.shipping_address ? shipping_address : address;
        updateUser.answer = updateUser.answer ? answer.toLowerCase() : 'bikersclan';
        updateUser.role = role ? role : 0;

        if (password) {
            const passwordBcrypt = await Bcrypt.hash(password, 10);
            updateUser.password = passwordBcrypt;
            updateUser.repeat_password = passwordBcrypt;
        }

        await updateUser.save();
        res.send(updateUser);
    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
};




const Delete = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.send('Deleted')
}

module.exports = { Customers, Create, View, Update, Delete }