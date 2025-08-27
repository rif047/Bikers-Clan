const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const ExpenseSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    images: {
        type: [String]
    },
    category: {
        type: Mongoose.Types.ObjectId,
        ref: 'Expense_Category',
        required: true
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
})

let Expense = Mongoose.model('Expense', ExpenseSchema)

module.exports = Expense;