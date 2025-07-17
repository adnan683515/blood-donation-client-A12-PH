import React, { useState } from 'react';
import AuthHook from '../Share/Hooks/AuthHook';
import DeshBoardTabulaerView from './DeshBoardTabulaerView';
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import RoleHook from '../Share/Hooks/RoleHook';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const Welcome = () => {
    const { user, loading } = AuthHook();
    const axiosSecure = AxiosSecure();
    const [role, roleLoading] = RoleHook();

    const [countDonors, setCountDonors] = useState(null);
    const [countVolunteer, setCountVolunteer] = useState(null);
    const [totalUser, setTotalUser] = useState(null);
    const [request, setRequest] = useState(null);


    const { data: TotalFund = null, isLoading } = useQuery({
        queryKey: ['allFunds'],
        queryFn: async () => {
            const result = await axiosSecure.get('/loadFund');
            const totalMoney = result.data.reduce((acc, item) => acc + item.money, 0);

            return totalMoney
        }
    });


    const { data: donationData = [], refetch } = useQuery({
        queryKey: ['donationRequest', user?.email],
        enabled: !loading && !roleLoading && role !== 'Admin',
        queryFn: async () => {
            const result = await axiosSecure.get(`/loadDontaionRequest?email=${user?.email}`);
            const data = result.data;
            return Array.isArray(data) ? data : [data];
        },
    });

    const { data: donors = [] } = useQuery({
        queryKey: ['donor', user?.email],
        enabled: !loading && !roleLoading && (role === 'Admin' || role === 'Volunteer'),
        queryFn: async () => {
            const result = await axiosSecure.get(`/allDonors?email=${user?.email}`);
            setCountDonors(result?.data?.donors);
            setCountVolunteer(result?.data?.volunteer);
            setTotalUser(result?.data?.user);
            setRequest(result?.data?.request);
            return result.data;
        },
    });

    const isInitialLoading = loading || roleLoading || !role || isLoading;
    if (isInitialLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Bars height="50" width="50" color="#e11d48" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    const handleStatus = async (e, id) => {
        const action = e.innerText;
        if (action === 'Edit' || action === 'Delete') {
            if (action === 'Delete') {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "This donation request will be permanently deleted.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const result = await axiosSecure.delete(`/deleteRequest/${id}`);
                        if (result?.data?.deletedCount) {
                            Swal.fire('Deleted!', 'Request has been deleted.', 'success');
                            refetch();
                        }
                    }
                });
            }
            return;
        }
        try {
            const result = await axiosSecure.patch(`/donationRequestUpdate/${id}/${action}`);
            if (result?.data?.modifiedCount) {
                action === 'Done'
                    ? toast.success('Donation Request Done!')
                    : toast.error('Donation Request Cancelled!');
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="sm:px-4 px-2 py-12 mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-rose-600 to-red-600  rounded-3xl text-white shadow-2xl p-10 text-center backdrop-blur-lg">
                <h1 className=" text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                    Welcome, {user?.displayName || 'Hero'} ({role})
                </h1>
                <p className="text-lg md:text-xl">Your contribution saves lives. Thank you! 🩸❤️</p>
            </div>

            {/* Stats for Admin/Volunteer */}
            {(role === 'Admin' || role === 'Volunteer') && (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
                    <StatCard label="Total Donors" value={countDonors} color="rose" icon="❤️" />
                    <StatCard label="Total Users" value={totalUser} color="red" icon="👥" />
                    <StatCard label="Volunteers" value={countVolunteer} color="green" icon="🤝" />
                    <StatCard label="Requests" value={request} color="rose" icon="📋" />
                    <StatCard label="Fund" value={`${TotalFund} Tk`} color="gray" icon="💳" />
                </div>
            )}

            {/* Table for Donors */}
            {role !== 'Admin' && donationData.length > 0 && (
                <div>
                    <div className="mt-12 rounded-3xl shadow-lg overflow-hidden bg-white">
                        <DeshBoardTabulaerView handleStatus={handleStatus} DonationRequest={donationData} />
                    </div>
                    <div className='flex justify-center mt-10 items-center'>
                        <Link to={'/deshboard/my-donation-requests'} className="bg-gradient-to-r px-3 py-2 rounded-sm from-rose-600 to-red-600 text-white flex items-center gap-2">
                            My Donation Requests
                            <FaArrowRight className="text-white" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};


const StatCard = ({ label, value, color, icon }) => {
    const bgColor = {
        rose: 'from-rose-100 to-rose-200',
        sky: 'from-sky-100 to-sky-200',
        green: 'from-green-100 to-green-200',
        purple: 'from-purple-100 to-purple-200',
    }[color];

    const textColor = {
        rose: 'text-rose-600',
        sky: 'text-sky-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
    }[color];

    return (
        <div className={`rounded-3xl shadow-lg p-6 text-center bg-gradient-to-br ${bgColor} hover:scale-[1.03] transition-all duration-300`}>
            <div className={`w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-white shadow-inner text-3xl ${textColor}`}>
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-1">{label}</h3>
            <p className={`text-4xl font-extrabold ${textColor}`}>{value ?? 0}</p>
        </div>
    );
};

export default Welcome;
