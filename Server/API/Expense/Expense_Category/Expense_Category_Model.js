const Mongoose = require('mongoose');
const JOI = require('joi');


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

const validate = (data) => {
    const schema = JOI.object({
        name: JOI.string().required().label("Category Name")
    });
    return schema.validate(data);
};

module.exports = { Expense_Category, validate };