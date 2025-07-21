import React from 'react';
import { Link } from 'react-router';

const DisplayDonationRequest = ({ request }) => {
    return (
        <div className="flex flex-col md:flex-row items-center bg-white   rounded-2xl overflow-hidden p-6 gap-6 border border-red-100  transition duration-300">
            <div className="flex-1 text-center md:text-left ">
                <h3 className="text-xl font-semibold text-red-600 tracking-wide">Recipient Name: {request.recipientName}</h3>
                <p className="text-gray-600 text-lg">Blood Group: <span className=" text-black">{request.bloodGroup}</span></p>
                <p className="text-gray-600 text-lg">District: <span className=" text-black">{request.finalZila}</span></p>
                <p className="text-gray-600 text-lg">Upazila: <span className=" text-black">{request.upazila}</span></p>
                <p className="text-gray-600 text-lg">Date: <span className=" text-black">{request?.date}</span>

                    <span className='ml-3 text-black'>{request?.timeFix}</span>
                </p>

                <Link to={`/donation-requests/${request?._id}`} className='w-full  pt-2'>
                    <button className='w-full cursor-pointer py-2 rounded-md bg-gradient-to-r from-rose-500 to-red-600  text-white font-semibold tracking-wide shadow-sm hover:opacity-90 transition duration-200'>
                        View More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DisplayDonationRequest;
