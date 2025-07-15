import React from 'react';
import { Link } from 'react-router';


const SearchDonerDisplay = ({ donor }) => {

   
    return (
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-xl overflow-hidden p-4 gap-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {/* Donor Image */}
            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                <img
                    src={donor?.image}
                    alt={donor?.name}
                    className="w-full h-full object-cover rounded-full border-4 border-red-500"
                />
            </div>

            {/* Donor Info */}
            <div className="flex-1  text-center md:text-left space-y-1">
                <h3 className="text-xl font-semibold text-red-600">Name: {donor.name}</h3>
                <p className="text-gray-700 text-base">Blood Group: <span className="font-medium">{donor.blood}</span></p>
                <p className="text-gray-700 text-base">District: <span className="font-medium">{donor.district}</span></p>
                <p className="text-gray-700 text-base">Upazila: <span className="font-medium">{donor.upazila}</span></p>
                <p className="text-gray-700 text-base">Email: <span className="font-medium">{donor?.email}</span></p>

                {/* <div className='w-full '>

                    <Link to={`/donation-requests/${donor?._id}`}>
                        <button className='bg-gradient-to-r rounded-sm shadow-md w-full text-white py-2    from-black to-red-600'>
                            view
                        </button>
                    </Link>
                </div> */}

            </div>

        </div>
    );
};

export default SearchDonerDisplay;
