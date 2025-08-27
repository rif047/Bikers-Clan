const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const CustomerSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    alt_phone: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    shipping_address: {
        type: String
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

let Customer = Mongoose.model('Customer', CustomerSchema)

module.exports = Customer;