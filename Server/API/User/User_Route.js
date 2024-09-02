const Express = require("express");
const Route = Express.Router();
const { Users, Create, View, Update, Delete } = require('./User_Controller')

Route.get('/', Users);
Route.post('/create', Create);
Route.get('/view/:phone', View);
Route.patch('/update/:id', Update);
Route.delete('/delete/:id', Delete);


module.exports = Route