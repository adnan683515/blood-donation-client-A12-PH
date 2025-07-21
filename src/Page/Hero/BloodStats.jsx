
import React from "react";
import { FiDroplet, FiHeart, FiUsers, FiActivity } from "react-icons/fi";
import CountUpState from "./CountUpState";


export const BloodStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 py-16 bg-gray-50 text-white">

            <div className="flex flex-col items-center bg-white text-center rounded-2xl shadow-md p-8 hover:shadow-lg transition duration-300">
                <FiDroplet className="text-6xl mb-4 text-rose-400" />
                <span className="text-5xl font-bold text-rose-600">
                    <CountUpState end={1500} />
                </span>
                <p className="mt-2 text-lg font-semibold text-gray-800">Blood Donors</p>
                <p className="text-sm text-gray-500 mt-1">Registered and ready to donate across the country</p>
            </div>


            <div className="flex flex-col items-center bg-white text-center rounded-2xl shadow-md p-8 hover:shadow-lg transition duration-300">
                <FiHeart className="text-6xl mb-4 text-rose-500" />
                <span className="text-5xl font-bold text-rose-600">
                    <CountUpState end={3000} />
                </span>
                <p className="mt-2 text-lg font-semibold text-gray-800">Blood Units Collected</p>
                <p className="text-sm text-gray-500 mt-1">Successfully donated through verified events & drives</p>
            </div>


            <div className="flex flex-col items-center bg-white text-center rounded-2xl shadow-md p-8 hover:shadow-lg transition duration-300">
                <FiUsers className="text-6xl mb-4 text-rose-500" />
                <span className="text-5xl font-bold text-rose-600">
                    <CountUpState end={850} />
                </span>
                <p className="mt-2 text-lg font-semibold text-gray-800">Active Volunteers</p>
                <p className="text-sm text-gray-500 mt-1">Always available to help users & organize drives</p>
            </div>


            <div className="flex flex-col items-center bg-white text-center rounded-2xl shadow-md p-8 hover:shadow-lg transition duration-300">
                <FiActivity className="text-6xl mb-4 text-rose-400" />
                <span className="text-5xl font-bold text-rose-600">
                    <CountUpState end={120} />
                </span>
                <p className="mt-2 text-lg font-semibold text-gray-800">Blood Drives Held</p>
                <p className="text-sm text-gray-500 mt-1">Organized in colleges, towns & medical facilities</p>
            </div>
        </div>

    );
};
