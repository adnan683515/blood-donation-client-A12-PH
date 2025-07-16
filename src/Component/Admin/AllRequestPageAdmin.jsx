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
    const [showperpage, setShowperpage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: AllRequestList = [], isLoading, refetch } = useQuery({
        queryKey: ['alldonationRequestList', user?.email],
        enabled: user?.email && !loading,
        queryFn: async () => {
            const result = await axiosSequre.get(`/allRequestList/${user?.email}/${showperpage}/${currentPage}`);
            return result?.data;
        }
    });

    const totalPages = Math.ceil(AllRequestList?.length / showperpage);
    const pages = [...Array(totalPages)].map((_, i) => i + 1);

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

    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

            {/* Optional: Admin Info */}
            {role === 'Admin' && (
                <div className="mb-10 bg-white rounded-2xl p-6 shadow-md border border-dashed border-red-200">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">Admin Panel:</span> You have full control over donation requests. You can edit, delete, or mark them as done/cancelled.
                    </p>
                </div>
            )}

            {/* Request Table */}
            {Array.isArray(AllRequestList) && AllRequestList.length > 0 && (
                <div className='bg-white shadow-xl rounded-2xl overflow-hidden'>
                    <DeshBoardTabulaerView role={role} handleStatus={handleStatus} DonationRequest={AllRequestList} />
                </div>
            )}

            {/* Pagination */}
            <div className='flex justify-center mt-8 items-center'>
                <div className='flex gap-2 flex-wrap'>
                    {pages?.map((numberOfPage) => (
                        <button
                            key={numberOfPage}
                            onClick={() => handlePage(numberOfPage)}
                            className={`px-4 py-2 rounded-full border transition-all ${currentPage === numberOfPage
                                    ? 'bg-red-600 text-white font-semibold shadow-md'
                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                }`}
                        >
                            {numberOfPage}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllRequestPageAdmin;
