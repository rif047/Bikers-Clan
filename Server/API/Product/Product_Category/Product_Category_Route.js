const Express = require("express");
const Route = Express.Router();
const { Product_Categories, Create, View, Update, Delete, uploadImages } = require('./Product_Category_Controller')

Route.get('/', Product_Categories);
Route.post('/create', uploadImages.single('image'), Create);
Route.get('/view/:name', View);
Route.patch('/update/:id', uploadImages.single('image'), Update);
Route.delete('/delete/:id', Delete);


module.exports = Route