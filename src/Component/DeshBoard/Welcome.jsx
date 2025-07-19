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
    const [userStatusCount, setUserStatusCount] = useState([])
    const [storeImageBox, setStoreImageBox] = useState([])
    const [storeImageVolunteerBox, setVolunteerImageBox] = useState([])

    const { data: TotalFund = null, isLoading } = useQuery({
        queryKey: ['allFunds'],
        queryFn: async () => {
            const result = await axiosSecure.get('/loadFund');
            const totalMoney = result.data.reduce((acc, item) => acc + item.money, 0);
            return totalMoney;
        },
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

    const { data: donorsBloodGroup = [], isLoading: allDataLoading } = useQuery({
        queryKey: ['donor', user?.email],
        enabled: !loading && !roleLoading && (role === 'Admin' || role === 'Volunteer'),
        queryFn: async () => {
            const result = await axiosSecure.get(`/allDonors?email=${user?.email}`);
            setCountDonors(result?.data?.donors);
            setCountVolunteer(result?.data?.volunteer);
            setTotalUser(result?.data?.user);
            setRequest(result?.data?.request);
            setUserStatusCount(result?.data?.storeUserStatus)
            setStoreImageBox(result?.data?.allDonorsImage)
            setVolunteerImageBox(result?.data?.allVolunTeerImage)
            return result?.data?.storeBloodGroupAndLenght;
        },
    });


    const isInitialLoading = loading || roleLoading || !role || isLoading || allDataLoading;
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
        <div className="sm:px-4 px-2 py-2 mx-auto">
            {/* Welcome Banner */}
            <div className="backdrop-blur-lg">
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-3">
                    Welcome, {user?.displayName || 'Hero'} ({role})
                </h1>
                <p className="text-lg md:text-xl">Your contribution saves lives. Thank you!</p>
            </div>

            {(role === 'Admin' || role === 'Volunteer') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
         
                    <div className="rounded-2xl bg-[#FFE4E4] p-6 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Total Donors</h3>
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-inner text-2xl text-rose-600">
                                ❤️
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-4xl font-extrabold text-rose-600">{countDonors ?? 0}</p>
                            <div>
                                <div className="flex items-center flex-wrap">
                                    {storeImageBox?.length > 0 &&
                                        storeImageBox.slice(0, 6).map((item, index) => (
                                            <img
                                                key={item.id}
                                                src={item.image}
                                                alt="avatar"
                                                className="w-10 h-10 rounded-full border-2 border-red-600 shadow-md object-cover -ml-3"
                                                style={{ zIndex: 10 - index }}
                                            />
                                        ))}

                                    {storeImageBox?.length > 5 && (
                                        <Link
                                            to="/deshboard/all-users"
                                            className="w-10 h-10 -ml-3 rounded-full bg-white border-2 border-dashed border-red-400 text-red-500 flex items-center justify-center text-xl font-bold hover:bg-red-100 transition-all duration-200"
                                            title="View all donors"
                                            style={{ zIndex: 0 }}
                                        >
                                            …
                                        </Link>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                 
                    <div className="rounded-2xl bg-[#D4F4DB] p-6 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Volunteers</h3>
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-inner text-2xl text-green-600">
                                🤝
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-4xl font-extrabold text-green-600">{countVolunteer ?? 0}</p>

                            <div className="flex items-center flex-wrap">
                                {storeImageVolunteerBox?.length > 0 &&
                                    storeImageVolunteerBox.slice(0, 6).map((item, index) => (
                                        <img
                                            key={item.id}
                                            src={item.image}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full border-2 border-green-600 shadow-md object-cover -ml-3"
                                            style={{ zIndex: 10 - index }}
                                        />
                                    ))}

                                {storeImageVolunteerBox?.length > 6 && (
                                    <Link
                                        to="/dashboard/volunteers"
                                        className="w-10 h-10 -ml-3 rounded-full bg-white border-2 border-dashed border-green-400 text-green-600 flex items-center justify-center text-xl font-bold hover:bg-green-100 transition-all duration-200"
                                        title="View all volunteers"
                                        style={{ zIndex: 0 }}
                                    >
                                        …
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Total Users */}
                    <div className="rounded-2xl bg-gradient-to-r from-[#ADE1BB]
                    to-[#CDFFC5] p-6 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-inner text-2xl text-red-600">
                                👥
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-4xl font-extrabold text-red-600">{totalUser ?? 0}</p>

                            <div className="flex gap-6 w-[70%] flex-wrap justify-start">
                                {userStatusCount?.length > 0 &&
                                    userStatusCount.map((item) => {
                                        if (parseInt(item?.count) > 0) {
                                            return (
                                                <div key={item?.id} className="relative">
                                                    <div className={`

                                                    text-sm bg-white p-3 rounded-md font-medium text-red-600 relative z-10 text-center min-w-[40px]
                                                        `}>
                                                        {item?.count}
                                                    </div>
                                                    <span
                                                        className={`absolute z-50 -top-3 left-1/2 -translate-x-1/2 text-white text-xs px-2 py-[2px] rounded-md shadow-sm font-semibold whitespace-nowrap ${item?.status?.toLowerCase() === "active"
                                                            ? "bg-green-500"
                                                            : "bg-red-400"
                                                            }`}
                                                    >
                                                        {item?.status}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        </div>
                    </div>




                    {/* Requests */}
                    <div className="rounded-2xl bg-gradient-to-r from-[#ADC2E1] to-[#C5DCFF] p-6 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-[#5483CA]">Requests</h3>
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-inner text-2xl text-rose-600">
                                📋
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-4xl font-extrabold text-[#5483CA]">{request ?? 0}</p>

                            <div className="flex gap-2 w-[70%] flex-wrap justify-start">
                                {donorsBloodGroup?.length &&
                                    donorsBloodGroup.map((item) => {
                                        if (parseInt(item?.count) > 0) {
                                            return (
                                                <div key={item?.id} className="relative">
                                                    <div className="text-sm bg-white p-3 rounded-md font-medium text-[#5483CA] relative z-10 text-center min-w-[40px]">
                                                        {item?.count}
                                                    </div>
                                                    <span className="absolute z-50 -top-3 left-1/2 -translate-x-1/2 text-white text-xs bg-[#5483CA] px-2 py-[2px] rounded-md shadow-sm font-semibold whitespace-nowrap">
                                                        {item?.bloodName}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        </div>
                    </div>


                    {/* Fund */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#D6EBFF] to-[#f0faff] p-6 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between ">
                        <div className="flex justify-between items-start mb-5">
                            <h3 className="text-xl font-semibold text-gray-800">Fund</h3>
                            <div className="w-14 h-14 border flex items-center justify-center rounded-full bg-white shadow text-2xl text-blue-500">
                                💳
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
                                {TotalFund ?? 0} Tk
                            </p>
                            <p className="text-sm font-medium text-gray-600">Total Raised</p>
                        </div>
                    </div>
                </div>
            )}



            {role !== 'Admin' && donationData.length > 0 && (
                <div>
                    <div className="mt-12 rounded-3xl overflow-hidden bg-white">
                        <DeshBoardTabulaerView handleStatus={handleStatus} DonationRequest={donationData} />
                    </div>
                    <div className="flex justify-end mt-3 items-center">
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

export default Welcome;
