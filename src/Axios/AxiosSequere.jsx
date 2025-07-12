// import axios from 'axios';
// import React from 'react';
// import AuthHook from '../Component/Share/Hooks/AuthHook';

// // Create instance
// const instance = axios.create({
//     baseURL: 'http://localhost:5000',
// });

// const AxiosSecure = () => {
//     const { user } = AuthHook();

//     // Add request interceptor to the instance
//     instance.interceptors.request.use(
//         (config) => {
//             const token = user?.accessToken; 
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );

//     return instance;
// };

// export default AxiosSecure;



import axios from "axios";
import React, {  useEffect } from "react";
import AuthHook from "../Component/Share/Hooks/AuthHook";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

const AxiosSequere = () => {
    const { user, handleLogout, loading } = AuthHook();

    useEffect(() => {
        if (!loading && user?.accessToken) {
            // Add request interceptor
            const requestInterceptor = axiosInstance.interceptors.request.use(
                (config) => {
                    config.headers.Authorization =`Bearer ${user.accessToken}`;
                    return config;
                }
            );

            // Add response interceptor
            const responseInterceptor = axiosInstance.interceptors.response.use(
                (res) => res,
                (err) => {
                    if (err?.response?.status === 401 || err?.response?.status === 403) {
                        handleLogout()
                            .then(() => {
                                console.log("Logged out due to token issue.");
                            })
                            .catch(console.error);
                    }
                    return Promise.reject(err);
                }
            );

            // Cleanup to prevent multiple interceptors on re-renders
            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, loading,handleLogout]);

    return axiosInstance;
};

export default AxiosSequere;