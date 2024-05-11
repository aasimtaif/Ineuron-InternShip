import axios from "axios";

const token = JSON.parse(localStorage.getItem('token')) || 'none';
export const Axios = axios.create({
    baseURL: 'https://ineuron-intern-ship.vercel.app/api/',
    headers: {
        'authorization': `Bearer ${token}`,
    },
});