const Express = require("express");
const Route = Express.Router();
const { Expenses, Create, View, Update, Delete, uploadImages } = require('./Expense_Controller')

Route.get('/', Expenses);
Route.post('/create', uploadImages.single('image'), Create);
Route.get('/view/:name', View);
Route.patch('/update/:id', uploadImages.single('image'), Update);
Route.delete('/delete/:id', Delete);


module.exports = Route