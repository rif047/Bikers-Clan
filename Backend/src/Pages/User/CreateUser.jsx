import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function CreateUser() {
    document.title = 'Add User';

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [alt_phone, setAltPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [shipping_address, setShippingAddress] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeatPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState("");
    const [passwordType, setPasswordType] = useState('password');

    const navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/users/create`, {
                name,
                phone,
                alt_phone: alt_phone ? alt_phone : phone,
                address,
                role,
                shipping_address: shipping_address ? shipping_address : address,
                email: email ? email : 'bikersclan.bd@gmail.com',
                password: password ? password : 'bikersclan',
                repeat_password: repeat_password ? repeat_password : 'bikersclan',
                answer: answer ? answer : 'bikersclan',
            });

            if (password !== repeat_password) {
                setError('Passwords do not match.');
                return;
            }

            const successMessageUrl = new URLSearchParams({ successMessage: 'Created successfully' });
            navigate({ pathname: '/users', search: successMessageUrl.toString() });

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
                    <NavLink to={'/users'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md" >
                        <span className="mr-2">User List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit}>
                    <div className='border-b-2 mb-10 pb-5'>
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

                        <div className='mb-4'>
                            <label>User Type*</label>

                            <select onChange={(e) => setRole(e.target.value)}>
                                <option>Select User Type [Default: Customer]</option>
                                <option value="0">Customer</option>
                                <option value="1">Admin</option>
                            </select>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label>Alternative Phone Number</label>
                        <input type="number" placeholder="Alternative Phone Number" onChange={(e) => setAltPhone(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Shipping Addresss</label>
                        <input type="text" placeholder="Shipping Address" onChange={(e) => setShippingAddress(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Email*</label>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-4">
                        <label>Password</label>
                        <div className='flex relative'>
                            <input
                                className=''
                                type={passwordType}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='absolute right-6 top-2 cursor-pointer' onClick={() => setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))}>
                                {passwordType === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label>Repeat Password</label>
                        <div className='flex relative'>
                            <input
                                className=''
                                type={passwordType}
                                placeholder="Repeat Password"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <div className='absolute right-6 top-2 cursor-pointer' onClick={() => setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))}>
                                {passwordType === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label>Password Recovery Question</label>

                        <select>
                            <option>Select One</option>
                            <option>What is your most favourite Bike Shop?</option>
                            <option>Who is the most important person in your life?</option>
                            <option>Who was your childhood hero?</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label>Answer</label>
                        <input type="text" placeholder="Answer" onChange={(e) => setAnswer(e.target.value)} />
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
