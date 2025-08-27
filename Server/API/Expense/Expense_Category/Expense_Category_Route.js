const Express = require("express");
const Route = Express.Router();
const { Expense_Categories, Create, View, Update, Delete } = require('./Expense_Category_Controller')



Route.get('/', Expense_Categories)
Route.post('/', Create)
Route.get('/view/:id', View)
Route.patch('/:id', Update)
Route.delete('/:id', Delete)







module.exports = Route