import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Axios} from '../utils/api';
export default function Register() {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const setInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post('auth/register', inputs)
            if (res.status === 200) {
                navigate('/login')
            }
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Create Account</div>
                <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                    <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-red-500"><i className="fab fa-facebook-f"></i></span>
                    <span className="text-red-">Signup with Facebook</span>
                </button>
                <div className="relative mt-10 h-px bg-gray-300">
                    <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                        <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Signup With Email</span>
                    </div>
                </div>
                <div className="mt-10">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-6">
                            <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">FullName:</label>
                            <div className="relative">
                                <input id="name" type="text" name="userName" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Full Name "
                                    onChange={setInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address"
                                    onChange={setInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label for="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>
                                </div>

                                <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password"
                                    onChange={setInputChange}

                                />
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                            >
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
                    <Link to="/login" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                        <span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </span>
                        <span className="ml-2">Already have an account?</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}