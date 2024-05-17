import axios from "axios";

const token = JSON.parse(localStorage.getItem('token')) || 'none';
export const Axios = axios.create({
    baseURL: ' http://localhost:8800/api/',
    headers: {
        'authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: false
});