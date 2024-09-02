const Express = require("express");
const Route = Express.Router();
const { Suppliers, Create, View, Update, Delete } = require('./Supplier_Controller')

Route.get('/', Suppliers);
Route.post('/create', Create);
Route.get('/view/:phone', View);
Route.patch('/update/:id', Update);
Route.delete('/delete/:id', Delete);


module.exports = Route