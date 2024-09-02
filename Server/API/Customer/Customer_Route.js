const Express = require("express");
const Route = Express.Router();
const { Customers, Create, View, Update, Delete } = require('./Customer_Controller')

Route.get('/', Customers);
Route.post('/create', Create);
Route.get('/view/:phone', View);
Route.patch('/update/:id', Update);
Route.delete('/delete/:id', Delete);


module.exports = Route