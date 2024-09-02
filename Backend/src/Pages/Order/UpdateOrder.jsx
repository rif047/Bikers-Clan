import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Layout from '../../Layout';

export default function UpdateUser() {
    const { username } = useParams();
    const [users, setUsers] = useState({});

    const [nameValue, setNameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axios.get(`http://fivosoft.mepfbd.com/api/users/view/${username}`);
                setUsers(response.data);
                setNameValue(response.data.name);
                setUsernameValue(response.data.username);
                setEmailValue(response.data.email);
                setPasswordValue(response.data.password);
                setRepeatPasswordValue(response.data.repeat_password);
                document.title = `Edit- ${response.data.username}`;
            } catch (error) {
                console.error('Error fetching menu item:', error);
            }
        };

        fetchMenuItem();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.patch(`http://fivosoft.mepfbd.com/api/users/update/${users._id}`, {
                name: nameValue,
                username: usernameValue,
                email: emailValue,
                password: passwordValue,
                repeat_password: repeatPasswordValue,
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Updated successfully' });

            navigate({ pathname: '/users', search: successMessageUrl.toString() });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <Layout>
            <div>
                <div className="max-w-[700px] px-2 mx-auto">
                    <div className="flex justify-end mb-2">
                        <NavLink
                            to={'/menu_list'}
                            className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 rounded-md"
                        >
                            <span className="mr-2">USERS LIST</span>
                            <ListAltOutlinedIcon />
                        </NavLink>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label>User Name</label>
                            <input
                                type="text"
                                value={usernameValue}
                                onChange={(e) => setUsernameValue(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label>Email</label>
                            <input
                                type="text"
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                value={repeatPasswordValue}
                                onChange={(e) => setRepeatPasswordValue(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 ml-1 mt-1 font-bold">{error}</p>}

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
