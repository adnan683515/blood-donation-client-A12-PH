import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AuthHook from '../Share/Hooks/AuthHook';
import AxiosSecure from '../../Axios/AxiosSequere';
import DeshBoardTabulaerView from '../DeshBoard/DeshBoardTabulaerView';

const MyDonationRequest = () => {
    const { user, loading } = AuthHook();
    const axiosSecure = AxiosSecure();

    const [statusFilter, setStatusFilter] = useState("all");

    const { data: DonationRequest = [], isLoading } = useQuery({
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    const handleStatusEvent = () => {
        console.log("handle event function")
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
                <DeshBoardTabulaerView handleStatusEvent={handleStatusEvent} DonationRequest={filteredRequest} />
            </div>
        </div>
    );
};

export default MyDonationRequest;
