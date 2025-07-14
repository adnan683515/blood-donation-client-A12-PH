import React from 'react';
import AuthHook from '../Component/Share/Hooks/AuthHook';
import { Bars } from 'react-loader-spinner';
import { Navigate } from 'react-router';

const PrivetRouter = ({ children }) => {
    const { user, loading } = AuthHook()

    // const loc = useLocation()

    if (loading) return <div className='min-h-screen flex justify-center items-center'>
        <Bars
        height="40"
        width="40"
        color="#e11d48 " // white color
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
    </div>

    console.log("user",user)
    

    if (!user) return <Navigate to={'/login'}></Navigate>
    return children;
};

export default PrivetRouter;