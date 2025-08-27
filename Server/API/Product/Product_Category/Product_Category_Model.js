const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const ProductCategorySchema = Mongoose.Schema({
    name: {
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

module.exports = Product_Category;