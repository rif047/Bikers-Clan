const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const ExpenseCategorySchema = Mongoose.Schema({
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

let Expense_Category = Mongoose.model('Expense_Category', ExpenseCategorySchema)

module.exports = Expense_Category;