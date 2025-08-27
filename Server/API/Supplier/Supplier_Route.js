const Express = require("express");
const Route = Express.Router();
const { Suppliers, Create, View, Update, Delete } = require('./Supplier_Controller')



Route.get('/', Suppliers)
Route.post('/', Create)
Route.get('/view/:id', View)
Route.patch('/:id', Update)
Route.delete('/:id', Delete)







module.exports = Route