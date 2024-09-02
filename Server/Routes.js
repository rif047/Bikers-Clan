const { requireSignIn, isAdmin } = require('./Middleware/Auth_Middleware');

const Express = require("express");
const Route = Express.Router();
const User = require('./API/User/User_Route');
const Auth = require('./API/Auth/Auth');
const Product_Category = require('./API/Product/Product_Category/Product_Category_Route');
const Product = require('./API/Product/Product_Route');
const Customer = require('./API/Customer/Customer_Route');
const Supplier = require('./API/Supplier/Supplier_Route');
const Expense_Category = require('./API/Expense/Expense_Category/Expense_Category_Route');
const Expense = require('./API/Expense/Expense_Route');



Route.use('/auth', Auth);
Route.use('/users', User);
Route.use('/product_categories', Product_Category);
Route.use('/products', Product);
Route.use('/customers', Customer);
Route.use('/suppliers', Supplier);
Route.use('/expense_categories', Expense_Category);
Route.use('/expenses', Expense);


module.exports = Route