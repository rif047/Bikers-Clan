import { useState, useEffect } from 'react';
import Layout from '../../../Layout';
import Datatable from '../../../Components/Datatable/Datatable';
import Add_Edit from './Add_Edit';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';

export default function Expense_Categories() {
    document.title = 'Expense Categories';

    const EndPoint = 'expense_categories';

    const userPermissions = {
        canEdit: true,
        canView: false,
        canDelete: false,
    };


    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/${EndPoint}`);
            const reversedData = response.data.reverse();
            setData(reversedData);
        } catch (error) {
            toast.error('Failed to fetch data. Please try again.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.name.toUpperCase()}?`)) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/${EndPoint}/${row._id}`);
                toast.success(`${row.name.toUpperCase()} has been deleted.`);
                fetchData();
            } catch (error) {
                toast.error('Failed to delete. Please try again.');
                console.error('Error deleting data:', error);
            }
        }
    };

    const handleAdd = () => {
        setEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (row) => {
        setEditData(row);
        setModalOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <ToastContainer position="bottom-right" autoClose={2000} />

            <section className="flex justify-between px-2 md:px-5 py-2 mb-3 bg-[#4c5165]">
                <div className='flex justify-center items-center'>
                    <h1 className="font-bold text-sm text-white mr-2">Expense Category</h1>
                    {loading ? (
                        <div className="flex justify-center items-center text-white">
                            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="10" strokeDashoffset="75" />
                            </svg>
                        </div>
                    ) : <button className="text-gray-200" onClick={fetchData}><CachedIcon /></button>
                    }
                </div>
                <div className='flex'>
                    <NavLink
                        to={'/expenses'}
                        className="!bg-[#FFFFFF] !text-gray-800 px-6 py-1 rounded-md font-bold text-sm !hover:bg-gray-200 mr-3"
                    >
                        {`<`} Expense
                    </NavLink>

                    <button
                        onClick={handleAdd}
                        className="bg-[#FFFFFF] text-gray-800 px-6 py-1 rounded-md font-bold text-sm hover:bg-gray-200"
                    >
                        Create +
                    </button>
                </div>
            </section>

            <section>
                {loading ? (
                    <div className="flex justify-center py-4">
                        <svg className="animate-spin p-5 h-32 w-32 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeDashoffset="80" />
                        </svg>
                    </div>
                ) : (
                    <Datatable
                        columns={['name'].map(key => ({
                            accessorKey: key,
                            header: key.charAt(0).toUpperCase() + key.slice(1),
                        }))}
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        permissions={userPermissions}
                    />
                )}
            </section>

            {modalOpen && (
                <Add_Edit
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    data={editData}
                    refreshData={fetchData}
                />
            )}
        </Layout>
    );
}