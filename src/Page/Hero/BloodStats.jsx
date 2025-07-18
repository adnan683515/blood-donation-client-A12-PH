
import React from "react";
import { FiDroplet, FiHeart, FiUsers, FiActivity } from "react-icons/fi";
import CountUpState from "./CountUpState";


export const BloodStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 px-4 py-12 bg-red-50 border text-white">
            <div className="flex flex-col items-center bg-rose-700 rounded-lg shadow-lg p-8">
                <FiDroplet className="text-6xl mb-4 text-red-300" />
                <span className="text-5xl font-bold text-white">
                    <CountUpState end={1500} />
                </span>
                <p className="mt-2 text-lg font-semibold">Blood Donors</p>
            </div>

            <div className="flex flex-col items-center bg-rose-600 rounded-lg shadow-lg p-8">
                <FiHeart className="text-6xl mb-4 text-red-400" />
                <span className="text-5xl font-bold text-white">
                    <CountUpState end={3000} />
                </span>
                <p className="mt-2 text-lg font-semibold">Blood Units Collected</p>
            </div>

            <div className="flex flex-col items-center bg-rose-800 rounded-lg shadow-lg p-8">
                <FiUsers className="text-6xl mb-4 text-red-400" />
                <span className="text-5xl font-bold text-white">
                    <CountUpState end={850} />
                </span>
                <p className="mt-2 text-lg font-semibold">Active Volunteers</p>
            </div>

            <div className="flex flex-col items-center bg-rose-500 rounded-lg shadow-lg p-8">
                <FiActivity className="text-6xl mb-4 text-red-300" />
                <span className="text-5xl font-bold text-white">
                    <CountUpState end={120} />
                </span>
                <p className="mt-2 text-lg font-semibold">Blood Drives Held</p>
            </div>
        </div>
    );
};
