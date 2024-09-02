import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function CreateCustomer() {
    document.title = 'Add Supplier';

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [alt_phone, setAltPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/suppliers/create`, {
                name,
                phone,
                alt_phone: alt_phone ? alt_phone : phone,
                address,
                description
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Created successfully' });
            navigate({ pathname: '/suppliers', search: successMessageUrl.toString() });

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
                    <NavLink to={'/suppliers'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md" >
                        <span className="mr-2">Supplier List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit}>
                    <div className="mb-4">
                        <label>Name*</label>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Phone Number*</label>
                        <input type="number" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Address*</label>
                        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Alternative Phone Number</label>
                        <input type="number" placeholder="Alternative Phone Number" onChange={(e) => setAltPhone(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Description</label>
                        <input type="textarea" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
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
