import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import Layout from '../../../Layout';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

export default function ExpenseCategory() {
    document.title = 'Expense Categories';


    const [refreshMessage, setRefreshMessage] = useState('');
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');



    // Pagination and reversed data
    const itemsPerPageOptions = [10, 20, 50, 100];
    const reverseData = [...filterData].reverse();
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min((currentPage + 1) * itemsPerPage, reverseData.length);
    const displayData = reverseData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(reverseData.length / itemsPerPage);
    const calculateReversedSL = (index) => reverseData.length - index;



    // When page load
    useEffect(() => {
        fetchData();
        handleSuccessMessage();
        if (searchTerm !== '') {
            handleSearch(searchTerm);
        }
    }, [searchTerm]);


    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expense_categories`);
            setExpenseCategories(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    // Delete expense_category by ID
    const handleDelete = async (id) => {
        const shouldDelete = window.confirm("Are you sure..?");

        if (shouldDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/expense_categories/delete/${id}`);
                fetchData();
                setSuccessMessage('Deleted successfully');
                setTimeout(() => setSuccessMessage(''), 1000);
            } catch (error) {
                console.error(error);
                setSuccessMessage('Failed to delete');
                setTimeout(() => setSuccessMessage(''), 2000);
            }
        }
    };





    // Refresh functionality
    const handleRefresh = async () => {
        try {
            setRefreshMessage('Refreshing....');

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expense_categories`);
            setExpenseCategories(response.data);
            setFilterData(response.data);
            setRefreshMessage('Data Refreshed');
            setTimeout(() => setRefreshMessage(''), 2000);
        } catch (error) {
            console.error(error);
            setRefreshMessage('Failed to refresh');
            setTimeout(() => setRefreshMessage(''), 2000);
        }
    };




    // Search functionality
    const handleSearch = async (term) => {
        setCurrentPage(0);
        setRefreshMessage('Searching...');
        setTimeout(() => setRefreshMessage(''), 2000);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const filtered = expenseCategories.filter((expense_category) => {
            let nameMatch = expense_category.name.toLowerCase().includes(term.toLowerCase());

            return nameMatch;
        });

        setFilterData(filtered);

        if (filtered.length === 0) {
            setRefreshMessage('No search results found!');
            setTimeout(() => setRefreshMessage(''), 9000);
        }
    };










    // Handle success messages from URL parameters
    const handleSuccessMessage = () => {
        const successMessage = new URLSearchParams(window.location.search).get('successMessage');
        if (successMessage) {
            setSuccessMessage(successMessage);
            setTimeout(() => setSuccessMessage(''), 2000);
            window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
        }
    };


    const successMessageClassName = successMessage.includes('Deleted successfully') ?
        "bg-red-100 border-t-4 border-red-500 rounded-sm text-red-900 px-6 py-1 mt-[-10px] shadow-md font-bold absolute animate-fade-left"
        :
        "bg-teal-100 border-t-4 border-teal-500 rounded-sm text-teal-900 px-6 py-1 mt-[-10px] shadow-md font-bold absolute animate-fade-left";




    // Capitalize the first letter of a string
    const capitalizeFirst = (sentence) => {
        const words = sentence.split(' ');
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(' ');
    };



    return (
        <Layout>
            {successMessage && (
                <p className={successMessageClassName}>
                    {successMessage} <DoneOutlinedIcon />
                </p>
            )}
            <div className="flex justify-end mb-5">
                <NavLink to={'/expenses'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 rounded-md mr-5">
                    <span className="mr-1">Expense List</span>
                    <ListAltOutlinedIcon />
                </NavLink>


                <NavLink to={'/expense_categories/create'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 rounded-md">
                    New
                    <AddOutlinedIcon />
                </NavLink>
            </div>


            <div className="flex flex-col justify-center md:flex-row md:justify-between">
                <div className="flex mb-3 justify-center">
                    <div className="">
                        <span>Items per page: </span>
                        <select
                            className="pl-2 rounded-md text-sms font-bold"
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            value={itemsPerPage}
                        >
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option} className="text-xs">
                                    {option}
                                </option>
                            ))}
                            <option value={filterData.length}>All</option>
                        </select>
                    </div>



                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="px-2 bg-gray-600 hover:shadow-xl text-gray-200 rounded-md mx-3 text-sm font-bold shadow-md"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Export"
                    />

                    <div className="ml-3">
                        <button onClick={handleRefresh} className="px-2 rounded">
                            <LoopIcon />
                        </button>
                        <span className="ml-2 text-sm font-bold">{refreshMessage}</span>
                    </div>


                </div>

                <div className="flex mb-2 justify-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-2 rounded-l-sm focus:outline-none w-72 shadow-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => handleSearch(searchTerm)} className="px-2 bg-gray-400 text-white rounded-r-sm shadow-lg" >
                        <SearchOutlinedIcon />
                    </button>
                </div>

            </div>



            <table className="w-full text-xs text-left text-gray-500 shadow-md rounded-lg mt-2 mb-2" id="table-to-xls">
                <thead className="text-gray-900 uppercase bg-gray-400 [&>tr>th]:px-4 [&>tr>th]:py-3 [&>tr>th]:text-center [&>tr>th]:border">
                    <tr>
                        <th scope="col" className=" w-[80px]">
                            S.L
                        </th>
                        <th scope="col">
                            Expense Category Name
                        </th>
                        <th scope="col" className=" w-[100px]">
                            Action
                        </th>
                    </tr>
                </thead>


                <tbody className="[&>tr>td]:px-4 [&>tr>td]:py-1 [&>tr>td]:font-normal [&>tr>td]:text-gray-900 [&>tr>td]:text-center [&>tr>td]:border">
                    {displayData.map((expense_category, index) => (
                        <tr key={expense_category._id} className="bg-white border-b hover:bg-gray-100">
                            <td className=" w-[80px]">
                                {calculateReversedSL(startIndex + index)}
                            </td>
                            <td>
                                {capitalizeFirst(expense_category.name)}
                            </td>
                            <td className=" w-[100px]">

                                <NavLink
                                    to={`/expense_categories/update/${expense_category.name}`}
                                    className="mr-3 [&>svg]:text-yellow-400"
                                >
                                    <EditOutlinedIcon />
                                </NavLink>

                                <button onClick={() => handleDelete(expense_category._id)} className="[&>svg]:text-red-400"><DeleteOutlineOutlinedIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <div className="mt-5">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0} className="mr-2 text-gray-600 [&>*]:!text-[16px]">
                    <ArrowBackIosNewOutlinedIcon />
                </button>


                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? "bg-gray-300 mx-1 px-2 rounded" : "px-1 mx-1"} >
                        {i + 1}
                    </button>
                ))}


                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= filterData.length} className="ml-2 text-gray-600 [&>*]:!text-[16px]" >
                    <ArrowForwardIosOutlinedIcon />
                </button>
            </div>
        </Layout>
    );
}
