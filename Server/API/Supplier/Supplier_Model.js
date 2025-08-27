const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const SupplierSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
})

let Supplier = Mongoose.model('Supplier', SupplierSchema)

module.exports = Supplier;