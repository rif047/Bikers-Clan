import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    document.title = 'Login';

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth`, { phone, password });
            const token = response.data.token;
            localStorage.setItem('token', token);

            setPhone('')
            setPassword('')
            window.location.href = "/";

        } catch (error) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            }

            if (error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-500 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl mb-8 font-semibold">Login to FivoSoft Technology</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input name="phone" type="text" className="mt-1 mb-2 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                                </div>
                                <div className="relative">
                                    <input name="password" type="password" className="mt-1 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                {error && <div className='text-red-600 mt-4'>{error}</div>}
                                <div className="relative">
                                    <button type="submit" className="bg-gray-500 hover:bg-gray-800 text-white rounded-md px-8 py-1 mt-3">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
