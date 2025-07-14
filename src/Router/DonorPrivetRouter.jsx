import React from 'react';
import AuthHook from '../Component/Share/Hooks/AuthHook';
import RoleHook from '../Component/Share/Hooks/RoleHook';
import { Bars } from 'react-loader-spinner';
import { Navigate } from 'react-router';

const DonorPrivetRouter = ({ children }) => {
    const { user, loading } = AuthHook()
    const [role, roleLoading] = RoleHook()

    if (loading || roleLoading) {

        return <div className='min-h-screen flex justify-center items-center'>
            <Bars
                height="30"
                width="30"
                color="#ff0000" // white color
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
    if (!user || role === 'Admin') {

        return <Navigate to={'/errorpage'}></Navigate>
    }

    return children;
};

export default DonorPrivetRouter;