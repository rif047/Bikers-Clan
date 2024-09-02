const Mongoose = require('mongoose');
const JOI = require('joi');

let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);

const SupplierSchema = new Mongoose.Schema({
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
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
});

const Supplier = Mongoose.model('Supplier', SupplierSchema);



const validate = (data) => {
    const schema = JOI.object({
        name: JOI.string().required().label("Name"),
        phone: JOI.string().pattern(/^0[0-9]{10}$/).required().label("Phone Number").messages({ 'string.pattern.base': 'Phone Number start with 0 and must 11 digit' }),
        alt_phone: JOI.string().pattern(/^0[0-9]{10}$/).label("Alternative Phone Number").messages({ 'string.pattern.base': 'Alternative Phone Number start with 0 and must 11 digit' }),
        address: JOI.string().required().label("Address"),
        description: JOI.string().allow('').label("Description")
    });
    return schema.validate(data);
};

module.exports = { Supplier, validate };
