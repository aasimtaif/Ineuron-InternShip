import axios from "axios";


export const Axios = axios.create({
    baseURL: 'http://localhost:8800/api/',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer your_token_here',
    // },
});