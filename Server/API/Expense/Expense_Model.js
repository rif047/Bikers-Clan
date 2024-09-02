const Mongoose = require('mongoose');
const joi = require("joi");

let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);


const ExpenseSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
    },
    category: {
        type: Mongoose.Types.ObjectId,
        ref: 'Expense_Category'
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
})

const Expense = Mongoose.model('Expense', ExpenseSchema)


const validate = (data) => {
    const schema = joi.object({
        category: joi.string().required().label("Expense Type"),
        name: joi.string().required().label("Expense Name"),
        amount: joi.number().required().label("Amount"),
        description: joi.string().allow('').label("Description"),
        date: joi.date().required().label("Date"),
        image: joi.string().allow('').label("Image")
    });
    return schema.validate(data);
};


module.exports = { Expense, validate };