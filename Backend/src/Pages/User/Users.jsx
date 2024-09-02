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

export default function User() {
    document.title = 'Users';


    const [refreshMessage, setRefreshMessage] = useState('');
    const [users, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');



    // Pagination and reversed data
    const itemsPerPageOptions = [10, 20, 50, 100];
    const reversedCustomers = [...filteredCustomers].reverse();
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min((currentPage + 1) * itemsPerPage, reversedCustomers.length);
    const displayedCustomers = reversedCustomers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(reversedCustomers.length / itemsPerPage);
    const calculateReversedSL = (index) => reversedCustomers.length - index;



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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
            const allCustomers = response.data;
            const filteredRoleCustomers = allCustomers.filter(user => user.role === 1);

            setCustomers(filteredRoleCustomers);
            setFilteredCustomers(filteredRoleCustomers);
        } catch (error) {
            console.error(error);
        }
    };




    // Delete user by ID
    const handleDelete = async (id) => {
        const shouldDelete = window.confirm("Are you sure..?");

        if (shouldDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/delete/${id}`);
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

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
            const allCustomers = response.data;
            const filteredRoleCustomers = allCustomers.filter(user => user.role === 1);
            setCustomers(filteredRoleCustomers);
            setFilteredCustomers(filteredRoleCustomers);
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

        const filtered = users.filter((user) => {
            let nameMatch = user.name.toLowerCase().includes(term.toLowerCase());
            let phoneMatch = user.phone.includes(term);
            let altPhoneMatch = user.alt_phone && user.alt_phone.includes(term);
            let addressMatch = user.address.toLowerCase().includes(term.toLowerCase());
            let shippingAddressMatch = user.shipping_address.toLowerCase().includes(term.toLowerCase());
            let emailMatch = user.email && user.email.toLowerCase().includes(term.toLowerCase());

            return nameMatch || phoneMatch || altPhoneMatch || addressMatch || shippingAddressMatch || emailMatch;
        });

        setFilteredCustomers(filtered);

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
                <NavLink to={'/users/create'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 rounded-md">
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
                            <option value={filteredCustomers.length}>All</option>
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
                            Name
                        </th>
                        <th scope="col">
                            Phone
                        </th>
                        <th scope="col">
                            Alt Phone
                        </th>
                        <th scope="col">
                            Address
                        </th>
                        <th scope="col">
                            Shipping Address
                        </th>
                        <th scope="col">
                            Email
                        </th>
                        <th scope="col" className=" w-[100px]">
                            Action
                        </th>
                    </tr>
                </thead>


                <tbody className="[&>tr>td]:px-4 [&>tr>td]:py-1 [&>tr>td]:font-normal [&>tr>td]:text-gray-900 [&>tr>td]:text-center [&>tr>td]:border">
                    {displayedCustomers.map((user, index) => (
                        <tr key={user._id} className="bg-white border-b hover:bg-gray-100">
                            <td className=" w-[80px]">
                                {calculateReversedSL(startIndex + index)}
                            </td>
                            <td>
                                {capitalizeFirst(user.name)}
                            </td>
                            <td>
                                {user.phone}
                            </td>
                            <td>
                                {user.alt_phone === undefined || user.alt_phone === user.phone ? 'N/A' : user.alt_phone}
                            </td>
                            <td>
                                {user.address}
                            </td>
                            <td>
                                {user.shipping_address === undefined || user.shipping_address === user.address ? 'N/A' : user.shipping_address}

                            </td>
                            <td>
                                {user.email === undefined || user.email === 'bikersclan.bd@gmail.com' ? 'N/A' : user.email}
                            </td>
                            <td className=" w-[100px]">

                                <NavLink
                                    to={`/users/update/${user.phone}`}
                                    className="mr-3 [&>svg]:text-yellow-400"
                                >
                                    <EditOutlinedIcon />
                                </NavLink>

                                <button onClick={() => handleDelete(user._id)} className="[&>svg]:text-red-400"><DeleteOutlineOutlinedIcon /></button>
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


                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= filteredCustomers.length} className="ml-2 text-gray-600 [&>*]:!text-[16px]" >
                    <ArrowForwardIosOutlinedIcon />
                </button>
            </div>
        </Layout>
    );
}
