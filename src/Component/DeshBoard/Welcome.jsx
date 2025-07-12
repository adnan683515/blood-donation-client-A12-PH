import React, { useEffect, useState } from 'react';
import AuthHook from '../Share/Hooks/AuthHook';
import DeshBoardTabulaerView from './DeshBoardTabulaerView';
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import RoleHook from '../Share/Hooks/RoleHook';
import toast from 'react-hot-toast';

const Welcome = () => {
    const { user, loading } = AuthHook(); // get user from auth hook
    const axiosSecure = AxiosSecure(); // secure axios instance
    const [role, roleLoading] = RoleHook(); // get role from role hook
    const [countDonors, setCountDonors] = useState(null);
    const [countVolunteer, setCountVolunteer] = useState(null);
    const [totalUser, setTotalUser] = useState(null);
    const [request, setRequest] = useState(null);

    // Get Donation Request for Donors
    const { data: donationData = [], refetch } = useQuery({
        queryKey: ['donationRequest', user?.email],
        enabled: !loading && !roleLoading && role !== 'Admin',
        queryFn: async () => {
            const result = await axiosSecure.get(`/loadDontaionRequest?email=${user?.email}`);
            const data = result.data;
            // Ensure it's always an array
            return Array.isArray(data) ? data : [data];
        },
    });

    // Get all donors for Admin
    const { data: donors = [] } = useQuery({
        queryKey: ['donor', user?.email],
        enabled: !loading && !roleLoading && role === 'Admin',
        queryFn: async () => {
            const result = await axiosSecure.get(`/allDonors?email=${user?.email}`);
            setCountDonors(result?.data?.donors);
            setCountVolunteer(result?.data?.volunteer);
            setTotalUser(result?.data?.user);
            setRequest(result?.data?.request);
            return result.data;
        },
    });

    const isInitialLoading = loading || roleLoading || !role;
    if (isInitialLoading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    const handleStatus = async (e, id) => {
        try {
            const result = await axiosSecure.patch(`/donationRequestUpdate/${id}/${e.innerText}`);
            if (result?.data?.modifiedCount) {
                e.innerText === 'Done'
                    ? toast.success("Donation Request Successfully Done")
                    : toast.error("Donation Request Cancel!");
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-black to-red-700 p-8 rounded-xl shadow-lg text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Welcome, {user?.displayName || 'Valued User'} ({role}) 🎉
                </h1>
                <p className="text-lg md:text-xl">
                    Thank you for stepping up to save lives through blood donation. ❤️
                </p>
            </div>

            {/* Donation Requests for Donors */}
            {role !== 'Admin' && Array.isArray(donationData) && donationData.length > 0 && (
                <div className='relative overflow-hidden mt-10'>
                    <DeshBoardTabulaerView handleStatus={handleStatus} DonationRequest={donationData} />
                </div>
            )}

            {/* Admin Dashboard Stats */}
            {role === 'Admin' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {/* Donors Card */}
                    <div className="bg-white text-black rounded-2xl shadow-xl p-6 flex items-center gap-4 hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1">Total Donors</h2>
                            <p className="text-3xl font-semibold text-red-600">{countDonors ?? 0}</p>
                        </div>
                    </div>

                    {/* Total Users Card */} 
                    <div className="bg-white text-black rounded-2xl shadow-xl p-6 flex items-center gap-4 hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20H2v-2a4 4 0 014-4h1m4-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1">Total Users</h2>
                            <p className="text-3xl font-semibold text-blue-600">{totalUser || 0}</p>
                        </div>
                    </div>

                    {/* Volunteers Card */}
                    <div className="bg-white text-black rounded-2xl shadow-xl p-6 flex items-center gap-4 hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1">Total Volunteers</h2>
                            <p className="text-3xl font-semibold text-green-600">{countVolunteer ?? 0}</p>
                        </div>
                    </div>

                    {/* Donation Requests Card */}
                    <div className="bg-white text-black rounded-2xl shadow-xl p-6 flex items-center gap-4 hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1">Total Requests</h2>
                            <p className="text-3xl font-semibold text-purple-600">{request ?? 0}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;
