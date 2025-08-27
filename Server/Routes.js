const Express = require('express');
const Route = Express.Router();


const Product_Category = require('./API/Product/Product_Category/Product_Category_Route.js');
const Product = require('./API/Product/Product_Route.js');
const Customer = require('./API/Customer/Customer_Route.js');
const Supplier = require('./API/Supplier/Supplier_Route.js');
const Expense_Category = require('./API/Expense/Expense_Category/Expense_Category_Route.js');
const Expense = require('./API/Expense/Expense_Route.js');
const User = require('./API/User/User_Route.js');


Route.get('/', (req, res) => res.send('Server API is here'));


Route.use('/products', Product);
Route.use('/product_categories', Product_Category);

Route.use('/customers', Customer);
Route.use('/suppliers', Supplier);

Route.use('/expenses', Expense);
Route.use('/expense_categories', Expense_Category);
Route.use('/users', User);


Route.use((err, req, res, next) => {
    console.error('Error in routes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = Route;
