import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AuthHook from '../Share/Hooks/AuthHook';
import AxiosSecure from '../../Axios/AxiosSequere';
import DeshBoardTabulaerView from '../DeshBoard/DeshBoardTabulaerView';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import RoleHook from '../Share/Hooks/RoleHook';

const MyDonationRequest = () => {
    const { user, loading } = AuthHook();
    const axiosSecure = AxiosSecure();
    const [role,roleLoading] = RoleHook()
    const [statusFilter, setStatusFilter] = useState("all");

    const { data: DonationRequest = [], isLoading ,refetch } = useQuery({
        queryKey: ['mydonationRequest', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const result = await axiosSecure.get(`/loadDontaionRequest?email=${user?.email}`);
            return result?.data;
        }
    });

    const filteredRequest = statusFilter === "all"
        ? DonationRequest
        : DonationRequest.filter(item => item.status === statusFilter);

    const handleStatus = async (e, id) => {

        const action = e.innerText
        if (action === 'Edit' || action === 'Delete') {
            if (action === 'Delete') {
                if (role !== 'Donor') {
                    toast.error("Delete Only  Donor")
                    return
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

                        const result = await axiosSecure.delete(`/deleteRequest/${id}`)
                        if (result?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }

                    }
                });

            }
            return
        }


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

    if (isLoading ||roleLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }



    return (
        <div className="px-4 py-8">
            {/* Title & Description */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-red-600">My Blood Donation Requests</h1>
                <p className="text-gray-600 mt-2">
                    Here you can view and manage all the blood donation requests you have made. Use the filter to check the current status of each request.
                </p>
            </div>

            {/* Filter Select */}
            <div className="mb-4 flex justify-end">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-red-400 text-red-600 px-4 py-2 rounded-md focus:outline-none"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div>
                <DeshBoardTabulaerView handleStatus={handleStatus} DonationRequest={filteredRequest} />
            </div>
        </div>
    );
};

export default MyDonationRequest;
