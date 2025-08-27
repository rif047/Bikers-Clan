import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Customers from './Pages/Customer/Customers';
import Suppliers from './Pages/Supplier/Suppliers';
import Products from './Pages/Product/Products';
import Product_Categories from './Pages/Product/Category/Product_Categories';

import Expenses from './Pages/Expense/Expenses';
import Expense_Categories from './Pages/Expense/Category/Expense_Categories';


export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />

            <Route path='/sales' element={<Dashboard />} />

            <Route path='/purchases' element={<Dashboard />} />

            <Route path='/products' element={<Products />} />
            <Route path='/products/categories' element={<Product_Categories />} />

            <Route path='/customers' element={<Customers />} />

            <Route path='/suppliers' element={<Suppliers />} />

            <Route path='/expenses' element={<Expenses />} />
            <Route path='/expenses/categories' element={<Expense_Categories />} />

            <Route path='/reports' element={<Dashboard />} />

            <Route path='/users' element={<Dashboard />} />
        </Routes>
    )
}
