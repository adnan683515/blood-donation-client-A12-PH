import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AuthHook from '../Share/Hooks/AuthHook';
import AxiosSequere from '../../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import DeshBoardTabulaerView from '../DeshBoard/DeshBoardTabulaerView';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import RoleHook from '../Share/Hooks/RoleHook';

const AllRequestPageAdmin = () => {
    const { user, loading } = AuthHook();
    const axiosSequre = AxiosSequere();
    const [role, roleLoading] = RoleHook();
    const [filterStatus, setFilterStatus] = useState('All');

    const { data: AllRequestList = [], isLoading, refetch } = useQuery({
        queryKey: ['alldonationRequestList', user?.email],
        enabled: user?.email && !loading,
        queryFn: async () => {
            const result = await axiosSequre.get(`/allRequestList/${user?.email}`);
            return result?.data;
        }
    });

    const handleStatus = async (e, id) => {
        const action = e.innerText;
        if (action === 'Edit' || action === 'Delete') {
            if (action === 'Delete') {
                if (role !== 'Admin') {
                    toast.error("Delete Only Admin");
                    return;
                }

                Swal.fire({
                    title: "Are you sure?",
                    text: "This donation request will be permanently deleted. You won't be able to undo this action!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const result = await axiosSequre.delete(`/deleteRequest/${id}`);
                        if (result?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    }
                });
            }
            return;
        }

        try {
            const result = await axiosSequre.patch(`/donationRequestUpdate/${id}/${e.innerText}`);
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

    // 🧠 Filtered List
    const filteredList = AllRequestList.filter(item =>
        filterStatus === 'All' ? true : item.status === filterStatus
    );

    if (loading || isLoading || roleLoading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <div className="px-4 py-10">
            {/* Header Section */}
            <div className="mb-8 bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
                    📋 All Donation Requests
                    <span className="text-white bg-red-600 px-3 py-1 rounded-full text-base font-semibold">
                        {AllRequestList?.length}
                    </span>
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    Below is a list of all donation requests submitted by users. You can view, filter, or manage them from here.
                </p>
            </div>

            {/* ✅ Filtering Section */}
            <div className="mb-8 flex flex-wrap gap-3 items-center justify-start">
                <button
                    onClick={() => setFilterStatus('All')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${filterStatus === 'All' ? 'bg-red-500 text-white' : 'border-gray-300 text-gray-700 hover:bg-red-100'} transition`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'border-yellow-400 text-yellow-700 hover:bg-yellow-100'} transition`}
                >
                    ⏳ pending
                </button>
                <button
                    onClick={() => setFilterStatus('inprogress')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${filterStatus === 'Inprogress' ? 'bg-blue-500 text-white' : 'border-blue-400 text-blue-700 hover:bg-blue-100'} transition`}
                >
                    🔄 In Progress
                </button>
                <button
                    onClick={() => setFilterStatus('Done')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${filterStatus === 'Done' ? 'bg-green-500 text-white' : 'border-green-400 text-green-700 hover:bg-green-100'} transition`}
                >
                    ✅ Done
                </button>
                <button
                    onClick={() => setFilterStatus('Cancel')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${filterStatus === 'Cancel' ? 'bg-red-600 text-white' : 'border-red-400 text-red-700 hover:bg-red-100'} transition`}
                >
                    ❌ Cancel
                </button>
            </div>

            {/* Optional: Admin Info */}
            {role === 'Admin' && (
                <div className="mb-10 bg-white rounded-2xl p-6 shadow-md border border-dashed border-red-200">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">Admin Panel:</span> You have full control over donation requests. You can edit, delete, or mark them as done/cancelled.
                    </p>
                </div>
            )}

            {/* Request Table */}
            {Array.isArray(filteredList) && filteredList.length > 0 ? (
                <div className='bg-white shadow-xl rounded-2xl overflow-hidden'>
                    <DeshBoardTabulaerView role={role} handleStatus={handleStatus} DonationRequest={filteredList} />
                </div>
            ) : (
                <div className='text-center text-gray-500 py-20'>No donation requests found for this filter.</div>
            )}
        </div>
    );
};

export default AllRequestPageAdmin;
