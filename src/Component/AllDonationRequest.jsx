import { useQuery } from '@tanstack/react-query';

import React from 'react';
import AxiosSecure from '../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import DisplayDonationRequest from './displayDonationRequest';


const AllDonationRequest = () => {
    const axiosSequere = AxiosSecure()

    const { data: allRequest = [], isLoading } = useQuery({
        queryKey: 'alldonationRequest',
        queryFn: (async () => {
            const result = await axiosSequere.get('/loadDontaionRequest?all=data')
            return result?.data
        })
    })

    return (
        <div className='w-[98%] mx-auto'>

            <div className="text-center sm:text-start  rounded-lg p-6  mx-auto my-8 ">
                <h2 className="text-2xl font-extrabold text-red-600 mb-2 ">
                    Urgent Blood Donation Requests – Help Save a Life
                </h2>
                <p className="text-red-700 text-lg leading-relaxed ">
                    These are pending blood donation requests made on behalf of patients who are in critical need.
                    Each request here represents someone’s fight for life — a friend, a parent, a child.

                </p>
            </div>

            {
                isLoading ? <div className='min-h-screen flex justify-center items-center'>
                    <Bars
                        height="40"
                        width="40"
                        color="#ff0000" // white color
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 '>
                    {
                        allRequest?.map((item) => <DisplayDonationRequest key={parseInt(item?._id)} request={item}></DisplayDonationRequest>)
                    }
                </div>
            }

            <div className="my-16 bg-gray-950 text-gray-100 p-6 rounded-xl ">
                <h3 className="text-2xl text-center font-bold text-red-600 mb-4  ">
                    Why Your Donation Matters ❤️
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Every blood donation goes beyond the needle—it brings hope, extends lives, and unites communities.
                    By answering these requests, you’re not just giving blood — you’re giving someone another birthday, another memory, another chance.
                </p>
                <p className="mt-4 text-gray-400 text-base">
                    Be the reason someone survives today. Check the requests above and see where you can help.
                    Your one bag of blood can save up to three lives.
                </p>
            </div>

        </div>
    );
};

export default AllDonationRequest;