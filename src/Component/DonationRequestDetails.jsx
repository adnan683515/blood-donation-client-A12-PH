import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import AxiosSecure from '../Axios/AxiosSequere';
import RequestConfirmModal from './RequestConfirmModal';
import RoleHook from './Share/Hooks/RoleHook';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import AuthHook from './Share/Hooks/AuthHook';

const DonationRequestDetails = () => {
    const { id } = useParams();
    const axiosSecure = AxiosSecure();
    let [isOpen, setIsOpen] = useState(false)
    const [role, roleLoading] = RoleHook()
    const {user,loading} = AuthHook()




    const { data: details = {}, isLoading, refetch } = useQuery({
        queryKey: ['details', id],
        enabled: !!id,
        queryFn: async () => {
            const result = await axiosSecure.get(`/detailsrequest/${id}`);
            return result.data;
        },
    });
    function open() {

        if (role !== 'Donor') {
            toast.error("Only Donors are allowed to perform this action.");
            return
        }
        if(details?.requesterEmail === user?.email){
            return toast.error("Oops! You can't confirm your own request.");
        }
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }


    if (isLoading || roleLoading || loading) {
        return <div className="flex justify-center items-center text-center py-10 text-lg font-semibold"><Bars
            height="50"
            width="50"
            color="#ff0000 " // white color
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div>;
    }

    return (
        <div className="sm:w-[80%] mx-auto px-4 py-10 ">
            {/* Inspiring header for donors */}
            <div className="bg-red-50 border border-red-300 text-red-600 p-6 rounded-xl  mb-6 text-center">
                <h2 className="text-2xl  font-bold mb-2">Your Blood Can Save a Life ❤️</h2>
                <p className="text-lg leading-relaxed">
                    This patient urgently needs <span className="font-semibold text-red-600">{details.bloodGroup}</span> blood.
                    If you’re a match, please consider donating — your help can truly make a life-saving difference.
                </p>
            </div>

            {/* Donation Request Details */}
            <div className="bg-white rounded-xl  p-6 space-y-4 text-gray-800 border border-gray-200">
                <h3 className="text-2xl font-bold text-red-600">Donation Request Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-semibold">Recipient Name:</span> {details.recipientName}</p>
                    <p><span className="font-semibold">Requested By:</span> {details.requesterName}</p>
                    <p><span className="font-semibold">Requester Email:</span> {details.requesterEmail}</p>
                    <p><span className="font-semibold">Blood Group:</span> {details.bloodGroup}</p>
                    <p><span className="font-semibold">District:</span> {details.finalZila}</p>
                    <p><span className="font-semibold">Upazila:</span> {details.upazila}</p>
                    <p><span className="font-semibold">Hospital:</span> {details.hospital}</p>
                    <p><span className="font-semibold">Address:</span> {details.address}</p>
                    <p><span className="font-semibold">Date:</span> {details.date}</p>
                    <p><span className="font-semibold">Time:</span> {details.timeFix}</p>
                    <p><span className="font-semibold">Status:</span> <span className="capitalize">🟡 {details.status}</span></p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-700">Message:</h4>
                    <p className="text-gray-600">{details.message}</p>
                </div>
            </div>

            {/* Donate Button */}
            <div className="mt-6 mb-9">
                <button

                    onClick={open}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white text-lg font-semibold rounded-xl shadow-md hover:opacity-90 transition"

                >
                    Donate Now
                </button>
            </div>
            <RequestConfirmModal refetch={refetch} id={id} close={close} isOpen={isOpen} setIsOpen={setIsOpen}>

            </RequestConfirmModal>
        </div>
    );
};

export default DonationRequestDetails;
