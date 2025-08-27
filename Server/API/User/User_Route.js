const Express = require("express");
const Route = Express.Router();
const { Users, Create, View, Update, Delete } = require('./User_Controller')



Route.get('/', Users)
Route.post('/', Create)
Route.get('/view/:id', View)
Route.patch('/:id', Update)
Route.delete('/:id', Delete)







module.exports = Route