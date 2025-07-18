import React from "react";
import CountUp from "react-countup";
import { FiDroplet, FiHeart, FiUsers, FiActivity } from "react-icons/fi";

export const BloodStats = () => {
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2   px-4 py-12 bg-red-50 border text-white">

            {/* Card 1 */}
            <div className="flex flex-col items-center bg-rose-700 rounded-lg shadow-lg p-8 ">
                <FiDroplet className="text-6xl mb-4 text-red-300" />
                <CountUp start={0} end={1500} duration={3} separator="," >
                    {({ countUpRef }) => <span ref={countUpRef} className="text-5xl font-bold" />}
                </CountUp>
                <p className="mt-2 text-lg font-semibold">Blood Donors</p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center bg-rose-600 rounded-lg shadow-lg p-8 ">
                <FiHeart className="text-6xl mb-4 text-red-400" />
                <CountUp start={0} end={3000} duration={3} separator="," >
                    {({ countUpRef }) => <span ref={countUpRef} className="text-5xl font-bold" />}
                </CountUp>
                <p className="mt-2 text-lg font-semibold">Blood Units Collected</p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center bg-rose-800 rounded-lg shadow-lg p-8 ">
                <FiUsers className="text-6xl mb-4 text-red-400" />
                <CountUp start={0} end={850} duration={3} separator="," >
                    {({ countUpRef }) => <span ref={countUpRef} className="text-5xl font-bold" />}
                </CountUp>
                <p className="mt-2 text-lg font-semibold">Active Volunteers</p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center bg-rose-500 rounded-lg shadow-lg p-8 ">
                <FiActivity className="text-6xl mb-4 text-red-300" />
                <CountUp start={0} end={120} duration={3} separator="," >
                    {({ countUpRef }) => <span ref={countUpRef} className="text-5xl font-bold" />}
                </CountUp>
                <p className="mt-2 text-lg font-semibold">Blood Drives Held</p>
            </div>

        </div>
    );
};
