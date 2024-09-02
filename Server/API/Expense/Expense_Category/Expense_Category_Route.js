const Express = require("express");
const Route = Express.Router();
const { Expense_Categories, Create, View, Update, Delete } = require('./Expense_Category_Controller.js')

Route.get('/', Expense_Categories);
Route.post('/create', Create);
Route.get('/view/:name', View);
Route.patch('/update/:id', Update);
Route.delete('/delete/:id', Delete);


module.exports = Route