import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function CreateExpenseCategory() {
    document.title = 'Add Expense Category';

    const [name, setName] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/expense_categories/create`, {
                name
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Created successfully' });
            navigate({ pathname: '/expense_categories', search: successMessageUrl.toString() });

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
                    <NavLink to={'/expense_categories'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md" >
                        <span className="mr-2">Expense Category List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit}>
                    <div className="mb-4">
                        <label>Name*</label>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
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
