import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function UpdateCustomer() {
    const { name } = useParams();
    const [expense_categories, setExpenseCategories] = useState({});

    const [nameValue, setNameValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expense_categories/view/${name}`);
                setExpenseCategories(response.data);
                setNameValue(response.data.name);
                document.title = `Edit- ${response.data.name}`;
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchCustomers();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/expense_categories/update/${expense_categories._id}`, {
                name: nameValue
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Updated successfully' });

            navigate({ pathname: '/expense_categories', search: successMessageUrl.toString() });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };


    return (
        <Layout>
            <div className="max-w-[700px] px-2 mx-auto">
                <div className="flex justify-end mb-2">
                    <NavLink to={'/expense_categories'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md"  >
                        <span className="mr-2">Expense Category List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>Name*</label>
                        <input
                            type="text"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 ml-1 mt-1 font-bold">{error}</p>}

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
