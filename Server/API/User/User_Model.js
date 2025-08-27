const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const UserSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
})

let User = Mongoose.model('User', UserSchema)

module.exports = User;