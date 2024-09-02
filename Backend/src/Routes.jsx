import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";


import Login from './Pages/Login/Login';

import Dashboard from './Pages/Dashboard/Dashboard';

import Products from './Pages/Product/Products';
import CreateProduct from './Pages/Product/CreateProduct';
import UpdateProduct from './Pages/Product/UpdateProduct';

import ProductCategories from './Pages/Product/Category/ProductCategories';
import CreateProductCategory from './Pages/Product/Category/CreateProductCategory';
import UpdateProductCategory from './Pages/Product/Category/UpdateProductCategory';

import Sales from './Pages/Sale/Sales';
import CreateSale from './Pages/Sale/CreateSale';
import UpdateSale from './Pages/Sale/UpdateSale';

import Orders from './Pages/Order/Orders';
import CreateOrder from './Pages/Order/CreateOrder';
import UpdateOrder from './Pages/Order/UpdateOrder';

import Purchases from './Pages/Purchase/Purchases';
import CreatePurchase from './Pages/Purchase/CreatePurchase';
import UpdatePurchase from './Pages/Purchase/UpdatePurchase';

import Customers from './Pages/Customer/Customers';
import CreateCustomer from './Pages/Customer/CreateCustomer';
import UpdateCustomer from './Pages/Customer/UpdateCustomer';

import Suppliers from './Pages/Supplier/Suppliers';
import CreateSupplier from './Pages/Supplier/CreateSupplier';
import UpdateSupplier from './Pages/Supplier/UpdateSupplier';

import Expenses from './Pages/Expense/Expenses';
import CreateExpense from './Pages/Expense/CreateExpense';
import UpdateExpense from './Pages/Expense/UpdateExpense';

import Expense_Categories from './Pages/Expense/Category/ExpenseCategories';
import CreateExpenseCategory from './Pages/Expense/Category/CreateExpenseCategory';
import UpdateExpenseCategory from './Pages/Expense/Category/UpdateExpenseCategory';

import Users from './Pages/User/Users';
import CreateUser from './Pages/User/CreateUser';
import UpdateUser from './Pages/User/UpdateUser';



export default function AllRoutes() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);
    return (
        <Routes>
            <Route path="/login" element={loggedIn ? (<Navigate to="/" />) : (<Login setLoggedIn={setLoggedIn} />)} />

            <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />



            <Route path="/products" element={loggedIn ? <Products /> : <Navigate to="/login" />} />
            <Route path="/products/create" element={loggedIn ? <CreateProduct /> : <Navigate to="/login" />} />
            <Route path="/products/update/:name" element={loggedIn ? <UpdateProduct /> : <Navigate to="/login" />} />

            <Route path="/product_categories" element={loggedIn ? <ProductCategories /> : <Navigate to="/login" />} />
            <Route path="/product_categories/create" element={loggedIn ? <CreateProductCategory /> : <Navigate to="/login" />} />
            <Route path="/product_categories/update/:name" element={loggedIn ? <UpdateProductCategory /> : <Navigate to="/login" />} />



            <Route path="/sales" element={loggedIn ? <Sales /> : <Navigate to="/login" />} />
            <Route path="/sales/create" element={loggedIn ? <CreateSale /> : <Navigate to="/login" />} />
            <Route path="/sales/update/:name" element={loggedIn ? <UpdateSale /> : <Navigate to="/login" />} />

            <Route path="/orders" element={loggedIn ? <Orders /> : <Navigate to="/login" />} />
            <Route path="/orders/create" element={loggedIn ? <CreateOrder /> : <Navigate to="/login" />} />
            <Route path="/orders/update/:name" element={loggedIn ? <UpdateOrder /> : <Navigate to="/login" />} />

            <Route path="/purchases" element={loggedIn ? <Purchases /> : <Navigate to="/login" />} />
            <Route path="/purchases/create" element={loggedIn ? <CreatePurchase /> : <Navigate to="/login" />} />
            <Route path="/purchases/update/:name" element={loggedIn ? <UpdatePurchase /> : <Navigate to="/login" />} />



            <Route path="/customers" element={loggedIn ? <Customers /> : <Navigate to="/login" />} />
            <Route path="/customers/create" element={loggedIn ? <CreateCustomer /> : <Navigate to="/login" />} />
            <Route path="/customers/update/:phone" element={loggedIn ? <UpdateCustomer /> : <Navigate to="/login" />} />

            <Route path="/suppliers" element={loggedIn ? <Suppliers /> : <Navigate to="/login" />} />
            <Route path="/suppliers/create" element={loggedIn ? <CreateSupplier /> : <Navigate to="/login" />} />
            <Route path="/suppliers/update/:phone" element={loggedIn ? <UpdateSupplier /> : <Navigate to="/login" />} />



            <Route path="/expenses" element={loggedIn ? <Expenses /> : <Navigate to="/login" />} />
            <Route path="/expenses/create" element={loggedIn ? <CreateExpense /> : <Navigate to="/login" />} />
            <Route path="/expenses/update/:id" element={loggedIn ? <UpdateExpense /> : <Navigate to="/login" />} />

            <Route path="/expense_categories" element={loggedIn ? <Expense_Categories /> : <Navigate to="/login" />} />
            <Route path="/expense_categories/create" element={loggedIn ? <CreateExpenseCategory /> : <Navigate to="/login" />} />
            <Route path="/expense_categories/update/:name" element={loggedIn ? <UpdateExpenseCategory /> : <Navigate to="/login" />} />



            <Route path="/users" element={loggedIn ? <Users /> : <Navigate to="/login" />} />
            <Route path="/users/create" element={loggedIn ? <CreateUser /> : <Navigate to="/login" />} />
            <Route path="/users/update/:phone" element={loggedIn ? <UpdateUser /> : <Navigate to="/login" />} />
        </Routes>
    )
}
