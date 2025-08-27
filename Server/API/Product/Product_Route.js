const Express = require("express");
const Route = Express.Router();
const { Products, Create, View, Update, Delete, uploadImages } = require('./Product_Controller')



Route.get('/', Products)
Route.post('/', uploadImages, Create)
Route.get('/view/:id', View)
Route.patch('/:id', uploadImages, Update)
Route.delete('/:id', Delete)







module.exports = Route