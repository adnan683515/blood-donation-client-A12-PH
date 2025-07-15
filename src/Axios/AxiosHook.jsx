
import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'https://a12-blood-server.vercel.app'
})

const AxiosHook = () => {
    return instance;
};

export default AxiosHook;