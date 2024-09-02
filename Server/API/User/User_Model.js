const Mongoose = require('mongoose');
const JOI = require('joi');

let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    alt_phone: {
        type: String,
    },
    email: {
        type: String,
        // unique: true,
    },
    address: {
        type: String,
        required: true
    },
    shipping_address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    repeat_password: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
        // 0 Means Customer, 1 Means Admin, 2 Means Manager
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
});

const User = Mongoose.model('User', UserSchema);



const validate = (data) => {
    const schema = JOI.object({
        name: JOI.string().required().label("Name"),
        phone: JOI.string().pattern(/^0[0-9]{10}$/).required().label("Phone Number").messages({ 'string.pattern.base': 'Phone Number start with 0 and must 11 digit' }),
        alt_phone: JOI.string().pattern(/^0[0-9]{10}$/).label("Alternative Phone Number").messages({ 'string.pattern.base': 'Alternative Phone Number start with 0 and must 11 digit' }),
        address: JOI.string().required().label("Address"),
        shipping_address: JOI.string().label("Shipping Address"),
        email: JOI.string().email().label("Email"),
        password: JOI.string().min(6).max(14).label("Password"),
        repeat_password: JOI.any().valid(JOI.ref('password')).messages({ "any.only": "Password did not match" }),
        answer: JOI.string().label("Answer"),
        role: JOI.string().label("Role"),
    });
    return schema.validate(data);
};

module.exports = { User, validate };
