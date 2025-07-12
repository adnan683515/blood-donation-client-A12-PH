import { useQuery } from '@tanstack/react-query';
import AuthHook from './AuthHook';
import AxiosSecure from '../../../Axios/AxiosSequere';

const RoleHook = () => {
    const { user, loading } = AuthHook();
    const axiosSecure = AxiosSecure();

    const { data: userRole = null, isLoading } = useQuery({
        queryKey: ['details', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure.get(`/userdata?email=${user?.email}`);
            return result?.data?.role || null;
        },
    });


    return [userRole, isLoading];
};

export default RoleHook;