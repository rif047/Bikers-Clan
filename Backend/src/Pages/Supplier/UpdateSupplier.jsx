import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function UpdateCustomer() {
    const { phone } = useParams();
    const [suppliers, setCustomers] = useState({});

    const [nameValue, setNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [altPhoneValue, setAltPhoneValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers/view/${phone}`);
                setCustomers(response.data);
                setNameValue(response.data.name);
                setPhoneValue(response.data.phone);
                setAltPhoneValue(response.data.alt_phone);
                setAddressValue(response.data.address);
                setDescriptionValue(response.data.description);
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
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/suppliers/update/${suppliers._id}`, {
                name: nameValue,
                phone: phoneValue,
                alt_phone: altPhoneValue ? altPhoneValue : phoneValue,
                address: addressValue,
                description: descriptionValue
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Updated successfully' });

            navigate({ pathname: '/suppliers', search: successMessageUrl.toString() });

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
                    <NavLink to={'/suppliers'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md"  >
                        <span className="mr-2">Supplier List</span>
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
                        <label>Phone Number*</label>
                        <input
                            type="number"
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Address*</label>
                        <input
                            type="text"
                            value={addressValue}
                            onChange={(e) => setAddressValue(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Alternative Phone Number</label>
                        <input
                            type="number"
                            value={altPhoneValue}
                            onChange={(e) => setAltPhoneValue(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Description</label>
                        <input
                            type="text"
                            value={descriptionValue ? descriptionValue : ''}
                            onChange={(e) => setDescriptionValue(e.target.value)}
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
