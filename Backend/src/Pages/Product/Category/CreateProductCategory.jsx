import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function CreateProductCategory() {
    document.title = 'Add Product Category';

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/product_categories/create`, {
                name,
                slug: slug ? slug : name
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Created successfully' });
            navigate({ pathname: '/product_categories', search: successMessageUrl.toString() });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }


    }


    return (
        <Layout>
            <div className="max-w-[700px] px-2 mx-auto">
                <div className="flex justify-end mb-2">
                    <NavLink to={'/product_categories'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md" >
                        <span className="mr-2">Product Category List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit}>
                    <div className="mb-4">
                        <label>Name*</label>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>Slug</label>
                        <input type="text" placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
                    </div>

                    {error && <p className="text-red-500 ml-1 mt-1 font-bold">{error}</p>}

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout >
    );
}
