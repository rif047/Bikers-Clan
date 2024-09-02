const Mongoose = require('mongoose');
const joi = require("joi");

let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);


const ProductSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    daraz_name: {
        type: String
    },
    buying: {
        type: Number,
        required: true
    },
    selling: {
        type: Number,
        required: true
    },
    daraz_selling: {
        type: Number
    },
    stock: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    feature: {
        type: Number,
        required: true
    },
    publish: {
        type: Number,
        required: true
    },
    images: {
        type: [String]
    },
    category: {
        type: Mongoose.Types.ObjectId,
        ref: 'Product_Category'
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
})

const Product = Mongoose.model('Product', ProductSchema)


const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Product Name"),
        daraz_name: joi.string().label("Product Name in Daraz"),
        buying: joi.number().required().label("Buying Price"),
        selling: joi.number().required().label("Selling Price"),
        daraz_selling: joi.number().label("Daraz Selling Price"),
        daraz_price: joi.number().label("Daraz Selling Price"),
        stock: joi.number().required().label("Initial Stock"),
        unit: joi.string().required().label("Product Unit"),
        description: joi.string().label("Description"),
        feature: joi.number().label("Feature Product"),
        publish: joi.number().label("Publish on Website"),
        category: joi.string().required().label("Category"),
    });
    return schema.validate(data);
};


module.exports = { Product, validate };