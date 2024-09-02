import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function UpdateCustomer() {
    const { name } = useParams();
    const [product_categories, setExpenseCategories] = useState({});

    const [nameValue, setNameValue] = useState('');
    const [slugValue, setSlugValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product_categories/view/${name}`);
                setExpenseCategories(response.data);
                setNameValue(response.data.name);
                setSlugValue(response.data.slug);
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
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/product_categories/update/${product_categories._id}`, {
                name: nameValue,
                slug: slugValue ? slugValue : nameValue,
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Updated successfully' });

            navigate({ pathname: '/product_categories', search: successMessageUrl.toString() });

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
                    <NavLink to={'/product_categories'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md"  >
                        <span className="mr-2">Product Category List</span>
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
                    <div className="mb-4">
                        <label>Slug*</label>
                        <input
                            type="text"
                            value={slugValue}
                            onChange={(e) => setSlugValue(e.target.value)}
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
