const Express = require("express");
const Route = Express.Router();
const { Products, Create, View, Update, Delete, uploadImages } = require('./Product_Controller')

Route.get('/', Products);
Route.post('/create', uploadImages, Create);
Route.get('/view/:name', View);
Route.patch('/update/:id', uploadImages, Update);
Route.delete('/delete/:id', Delete);


module.exports = Route