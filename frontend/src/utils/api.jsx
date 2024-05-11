import axios from "axios";

const token = JSON.parse(localStorage.getItem('token')) || 'none';
export const Axios = axios.create({
    baseURL: 'https://ineuron-internship.onrender.com/api/',
    headers: {
        'authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: false
});