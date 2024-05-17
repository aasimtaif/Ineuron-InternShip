import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authStore';
import { Axios } from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';

const notify = (message) => toast.error(message);
export default function Login() {
    const [inputs, setInputs] = useState({
        email: "admin@gmail.com",
        password: "123456"
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const setInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post('auth/login', inputs)
            if (res.status === 200) {
                dispatch(setUser(res.data.details))
                localStorage.setItem('user', JSON.stringify(res.data.details))
                localStorage.setItem('token', JSON.stringify(res.data.token))

                navigate('/')
            }
        } catch (error) {
            notify(error.response?.data?.error)
            console.error(error.response.data.error)
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <p className="bg-white font-bold text-gray-400 uppercase text-center text-md "> Login With Email</p>
                <div className="mt-10">
                    <form onSubmit={handleSubmit} >
                        <div className="flex flex-col mb-6">
                            <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>

                                <input required id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" onChange={setInputChange} value={inputs?.email} />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>
                                </div>

                                <input required id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" onChange={setInputChange} value={inputs?.password} />
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Login</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <Link to="/register" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                        <span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </span>
                        <span className="ml-2">You don't have an account?</span>
                    </Link>
                </div>
                <p className='text-xs font-light text-red-700 pt-2'>* Email and password is provided to Grant admin access to examine the website Plz dont delete or modify the whole data </p>
            </div>
        </div>
    );
}