import { useQuery } from '@tanstack/react-query';
import AuthHook from './AuthHook';
import AxiosSecure from '../../../Axios/AxiosSequere';
import { useState } from 'react';

const RoleHook = () => {
    const { user, loading } = AuthHook();
    const axiosSecure = AxiosSecure();
    const [status,SetStatus] = useState(null)
    const { data: userRole = null, isLoading } = useQuery({
        queryKey: ['details', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure.get(`/userdata?email=${user?.email}`);
            SetStatus(result?.data?.status)
            return result?.data?.role || null;
        },
    });




    return [userRole, isLoading,status];
};

export default RoleHook;