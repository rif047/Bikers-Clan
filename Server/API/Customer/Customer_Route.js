const Express = require("express");
const Route = Express.Router();
const { Customers, Create, View, Update, Delete } = require('./Customer_Controller')



Route.get('/', Customers)
Route.post('/', Create)
Route.get('/view/:id', View)
Route.patch('/:id', Update)
Route.delete('/:id', Delete)







module.exports = Route