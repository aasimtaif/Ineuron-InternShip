import axios from "axios";

const token = JSON.parse(localStorage.getItem('token')) || null;
console.log(token)
export const Axios = axios.create({
    baseURL: 'https://ineuron-internship.onrender.com/api/',
    headers: {
        'authorization': `Bearer ${token}`,
    },
});