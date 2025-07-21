import { useSetState } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { DNA } from 'react-loader-spinner';
import { Link } from 'react-router';

const DonorsPublicPage = () => {
    const [allVolunteer, setAllVolunteer] = useSetState([]);

    const { data: DonorsData = [], isLoading } = useQuery({
        queryKey: ['allDonors'],
        queryFn: async () => {
            const result = await axios.get(`https://a12-blood-server.vercel.app/allDonorsForPublic`);
            setAllVolunteer([result?.data?.resultVoluteen]);
            return result?.data?.result;
        },
    });
    console.log(allVolunteer)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <DNA visible={true} height="80" width="80" />
            </div>
        );
    }

    return (
        <div className="p-4">

            {DonorsData?.length > 0 && (
                <Marquee pauseOnHover speed={50} gradient={false} className="space-x-6 pb-6">
                    {DonorsData.map((donor, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col mx-4 items-center p-6 min-w-[280px]"
                        >
                            <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                                <img
                                    src={donor.image}
                                    alt={donor.name}
                                    className="rounded-full w-full h-full object-cover border-4 border-rose-600 shadow-md"
                                />
                                <div className="absolute bottom-2 right-2 bg-rose-600 px-4 py-1 rounded-full shadow-lg flex items-center gap-2 translate-x-1 translate-y-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 2C10.343 6.4 5 9 5 14a7 7 0 0014 0c0-5-5.343-7.6-7-12z"
                                        />
                                    </svg>
                                    <span className="text-white font-semibold text-lg">{donor.blood}</span>
                                </div>
                            </div>
                            <div className="mt-4 w-full text-left">
                                <h2 className="text-2xl font-extrabold text-gray-900">{donor.name}</h2>
                                <p className="mt-3 text-gray-700 text-md font-medium">
                                    {donor.upazila}, {donor.district}
                                </p>
                                <p className="mt-2 text-gray-500 text-sm italic">
                                    Last Seen: {donor.last_Login}
                                </p>
                            </div>
                        </div>
                    ))}
                </Marquee>
            )}


            <div className='mt-10'>
                <div className="flex pb-2 flex-row justify-between items-center sm:px-4">
                    <div className='flex justify-center sm:justify-start items-center'>
                        <h2 className="sm:text-3xl font-extrabold text-black">
                            Our Respective{' '}
                            <span className="text-rose-600">
                                Volunteers
                            </span>


                        </h2>
                    </div>

                    <Link to='/searchdonor'>
                        <button className="mt-4 sm:mt-0 px-4 sm:px-6 py-2 bg-rose-600  text-white rounded-lg font-semibold hover:bg-rose-700 transition">
                            Find More
                        </button>
                    </Link>

                </div>

                {allVolunteer[0]?.length > 0 && (
                    <Marquee
                        pauseOnHover
                        speed={50}
                        gradient={false}
                        direction="right"
                        className="space-x-6 pb-6"
                    >
                        {allVolunteer[0]?.map((volunteer, idx) => (
                            <div
                                key={idx}
                                className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col mx-4 items-center p-6 min-w-[280px]"
                            >
                                <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                                    <img
                                        src={volunteer.image}
                                        alt={volunteer.name}
                                        className="rounded-full w-full h-full object-cover border-4 border-rose-600 shadow-md"
                                    />
                                    <div className="absolute bottom-2 right-2 bg-rose-600 px-4 py-1 rounded-full shadow-lg flex items-center gap-2 translate-x-1 translate-y-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 2C10.343 6.4 5 9 5 14a7 7 0 0014 0c0-5-5.343-7.6-7-12z"
                                            />
                                        </svg>
                                        <span className="text-white font-semibold text-lg">{volunteer.blood}</span>
                                    </div>
                                </div>
                                <div className="mt-4 w-full text-left">
                                    <h2 className="text-2xl font-extrabold text-gray-900">{volunteer.name}</h2>
                                    <p className="mt-3 text-gray-700 text-md font-medium">
                                        {volunteer.upazila}, {volunteer.district}
                                    </p>
                                    <p className="mt-2 text-gray-500 text-sm italic">
                                        Last Seen: {volunteer.last_Login}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                )}
            </div>
        </div>
    );
};

export default DonorsPublicPage;
