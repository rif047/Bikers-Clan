const Mongoose = require('mongoose');
const JOI = require('joi');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const ProductCategorySchema = Mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
})

let Product_Category = Mongoose.model('Product_Category', ProductCategorySchema)

const validate = (data) => {
    const schema = JOI.object({
        name: JOI.string().required().label("Category Name"),
        slug: JOI.string().required().label("Slug")

    });
    return schema.validate(data);
};

module.exports = { Product_Category, validate };