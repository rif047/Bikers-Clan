const Express = require("express");
const Route = Express.Router();
const { Expenses, Create, View, Update, Delete, uploadImages } = require('./Expense_Controller')



Route.get('/', Expenses)
Route.post('/', uploadImages, Create)
Route.get('/view/:id', View)
Route.patch('/:id', uploadImages, Update)
Route.delete('/:id', Delete)







module.exports = Route