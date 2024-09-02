import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import Layout from '../../Layout';
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
import DownloadIcon from '@mui/icons-material/Download';

export default function Expense() {
    document.title = 'Expenses';


    const [refreshMessage, setRefreshMessage] = useState('');
    const [expenses, setCustomers] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');
    const [fullSizeImage, setFullSizeImage] = useState(null);



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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expenses`);
            setCustomers(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    // Delete expense by ID
    const handleDelete = async (id) => {
        const shouldDelete = window.confirm("Are you sure..?");

        if (shouldDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/expenses/delete/${id}`);
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

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expenses`);
            setCustomers(response.data);
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

        const searchFiltered = expenses.filter((expense) => {
            let nameMatch = expense.name.toLowerCase().includes(term.toLowerCase());
            let amountMatch = typeof expense.amount === 'string' ? expense.amount.includes(term) : expense.amount.toString().includes(term);
            let categoryMatch = expense.category.name.toLowerCase().includes(term.toLowerCase());

            return nameMatch || amountMatch || categoryMatch;
        });

        setFilterData(searchFiltered);

        if (searchFiltered.length === 0) {
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

    const convertISODate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();
    };




    // Function to toggle full-size image display
    const toggleFullSizeImage = (imageUrl) => {
        setFullSizeImage(imageUrl);
    };




    return (
        <Layout>
            {successMessage && (
                <p className={successMessageClassName}>
                    {successMessage} <DoneOutlinedIcon />
                </p>
            )}
            <div className="flex justify-end mb-5">
                <NavLink to={'/expense_categories'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 rounded-md mr-5">
                    <span className="mr-1">Expense Categories</span>
                    <ListAltOutlinedIcon />
                </NavLink>

                <NavLink to={'/expenses/create'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 rounded-md">
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
                        <th scope="col" className=" w-[100px]">
                            Date
                        </th>
                        <th scope="col">
                            Expense Type
                        </th>
                        <th scope="col">
                            Paid For
                        </th>
                        <th scope="col">
                            Description
                        </th>
                        <th scope="col" className=" w-[100px]">
                            Amount
                        </th>
                        <th scope="col" className=" w-[150px]">
                            Voucher
                        </th>
                        <th scope="col" className=" w-[100px]">
                            Action
                        </th>
                    </tr>
                </thead>


                <tbody className="[&>tr>td]:px-4 [&>tr>td]:py-1 [&>tr>td]:font-normal [&>tr>td]:text-gray-900 [&>tr>td]:text-center [&>tr>td]:border">
                    {displayData.map((expense, index) => (
                        <tr key={expense._id} className="bg-white border-b hover:bg-gray-100">
                            <td className=" w-[80px]">
                                {calculateReversedSL(startIndex + index)}
                            </td>
                            <td className=" w-[100px]">
                                {convertISODate(expense.date)}
                            </td>
                            <td>
                                {capitalizeFirst(expense.category.name)}
                            </td>
                            <td>
                                {capitalizeFirst(expense.name)}
                            </td>
                            <td>
                                {expense.description ? expense.description : 'N/A'}
                            </td>
                            <td className=" w-[100px]">
                                {expense.amount} /-
                            </td>
                            <td scope="row" className="px-4 py-3 font-medium text-gray-900 flex justify-center items-center w-[150px]">

                                <img
                                    src={
                                        expense.image
                                            ? `${process.env.REACT_APP_API_URL}/Images/Expenses/${expense.image}`
                                            : `${process.env.REACT_APP_API_URL}/Images/Expenses/voucher.jpg`
                                    }
                                    alt={expense.name}
                                    className="w-[70px] h-[50px] rounded-md shadow-lg cursor-pointer mr-2"
                                    onClick={() =>
                                        toggleFullSizeImage(
                                            expense.image
                                                ? `${process.env.REACT_APP_API_URL}/Images/Expenses/${expense.image}`
                                                : `${process.env.REACT_APP_API_URL}/Images/Expenses/voucher.jpg`
                                        )
                                    }
                                />
                                <a
                                    href={
                                        expense.image
                                            ? `${process.env.REACT_APP_API_URL}/Images/Expenses/${expense.image}`
                                            : `${process.env.REACT_APP_API_URL}/Images/Expenses/voucher.jpg`
                                    }
                                    download
                                    target="_blank"
                                >
                                    <span>
                                        <DownloadIcon />
                                    </span>
                                </a>
                            </td>
                            <td className=" w-[100px]">

                                <NavLink
                                    to={`/expenses/update/${expense._id}`}
                                    className="mr-3 [&>svg]:text-yellow-400"
                                >
                                    <EditOutlinedIcon />
                                </NavLink>

                                <button onClick={() => handleDelete(expense._id)} className="[&>svg]:text-red-400"><DeleteOutlineOutlinedIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Full-size image modal */}
            {fullSizeImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    onClick={() => setFullSizeImage(null)}
                >
                    <img src={fullSizeImage} alt="Full size" className="max-h-full max-w-full" />
                </div>
            )}



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
