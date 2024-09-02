import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import axios from 'axios';
import Layout from '../../Layout';

export default function CreatePortfolio() {
    const { name } = useParams();
    const [portfolio, setPortfolio] = useState();
    const [nameValue, setNameValue] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [nameError, setNameError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [imageError, setImageError] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://fivosoft.mepfbd.com/api/portfolios/view/${name}`);
            setPortfolio(response.data);
            setNameValue(response.data.name);
            setUrl(response.data.url);
            setDescription(response.data.description);
            setImage(response.data.image);
            setSelectedCategory(response.data.category?._id);
            document.title = `Edit- ${name}`;
        };

        fetchData();

        let fetchCategories = async () => {
            const response = await axios.get('http://fivosoft.mepfbd.com/api/portfolio_categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setNameError('');
        setUrlError('');
        setImageError('');
        setCategoryError('');

        if (!nameValue) {
            setNameError('Name is required!');
            return;
        }

        if (!url) {
            setUrlError('URL is required!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', nameValue);
            formData.append('url', url);
            formData.append('category', selectedCategory);
            formData.append('description', description);

            if (image) {
                formData.append('image', image);
            } else {
                formData.append('image', portfolio.image);
            }

            await axios.patch(`http://fivosoft.mepfbd.com/api/portfolios/update/${portfolio._id}`, formData);

            const successMessageUrl = new URLSearchParams({ successMessage: 'Updated successfully' });

            navigate({ pathname: '/portfolios', search: successMessageUrl.toString() });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error && err.response.data.error.includes('Name Already exists.')) {
                setNameError(err.response.data.error);
            }
            if (err.response && err.response.data && err.response.data.error && err.response.data.error.includes('URL already exists.')) {
                setUrlError(err.response.data.error);
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-[700px] px-2 mx-auto">
                <div className="flex justify-end mb-2">
                    <NavLink
                        to={'/portfolios'}
                        className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 rounded-md"
                    >
                        <span className="mr-2">Portfolios</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label>Category</label>
                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                        >
                            <option value="">Select a Category</option>
                            {categories?.map((category) => (
                                <option key={category?._id} value={category?._id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                        {categoryError && <p className="text-red-500 ml-1 mt-1">{categoryError}</p>}
                    </div>

                    <div className="mb-4">
                        <label>Project Name:</label>
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                        {nameError && <p className="text-red-500 ml-1 mt-1">{nameError}</p>}
                    </div>

                    <div className="mb-4">
                        <label>Project URL:</label>
                        <input
                            type="text"
                            placeholder="Project URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {urlError && <p className="text-red-500 ml-1 mt-1">{urlError}</p>}
                    </div>

                    <div className="mb-4">
                        <label>Project Description:</label>
                        <input
                            type="text"
                            placeholder="Project Description"
                            value={description ? description : ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Project Image:</label>
                        {image ? (
                            <img
                                src={imageUrl || `http://fivosoft.mepfbd.com/Images/Portfolio/${image}`}
                                alt={name}
                                className="w-[100px] mb-3 rounded-md shadow-lg"
                            />
                        ) : ''}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                setImage(selectedFile);
                                setImageUrl(URL.createObjectURL(selectedFile));
                            }}
                        />
                        {imageError && <p className="text-red-500 ml-1 mt-1">{imageError}</p>}
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
