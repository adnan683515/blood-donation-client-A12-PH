
import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

const AxiosHook = () => {
    return instance;
};

export default AxiosHook;