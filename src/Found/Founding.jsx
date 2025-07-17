import GiveFound from './GiveFound';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AxiosSequere from '../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';

const Founding = () => {
    const axiosSequre = AxiosSequere();
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const { data: allFunds = [], isLoading, refetch } = useQuery({
        queryKey: ['allFund'],
        queryFn: async () => {
            const result = await axiosSequre.get('/loadFund');
            return result?.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Bars height="50" width="50" color="#e11d48" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <div className="w-[98%] mx-auto">
            {/* Hero Section */}
            <div className="flex justify-center items-center">
                <div className="my-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-rose-600 leading-tight mb-2">
                        Help Us Bring Hope
                    </h2>
                    <p className="text-gray-700 sm:w-[60%] text-center mx-auto text-lg mb-6">
                        Many families in our community are struggling to cover their basic needs.
                        Your small donation can make a big difference in someone’s life.
                        Let’s unite to support the poor, the sick, and the helpless.
                    </p>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={open}
                            className="inline-block bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transition">
                            Donate Now 💳
                        </button>
                    </div>
                </div>
            </div>


            <GiveFound refetch={refetch} isOpen={isOpen} close={close} />


            <div className="my-10 bg-white shadow-md rounded-xl overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gradient-to-r from-rose-600 to-red-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">#</th>
                            <th className="px-6 py-3 text-left font-semibold">Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Email</th>
                            <th className="px-6 py-3 text-left font-semibold">Amount</th>
                            <th className="px-6 py-3 text-left font-semibold">Transaction ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Date</th>
                            <th className="px-6 py-3 text-left font-semibold">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {allFunds.map((fund, index) => (
                            <tr key={fund.tranjectionId} className="hover:bg-gray-50">
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-3 font-medium">{fund.name}</td>
                                <td className="px-6 py-3">{fund.email}</td>
                                <td className="px-6 py-3 font-semibold text-green-600">${fund.money}</td>
                                <td className="px-6 py-3 text-xs">{fund.tranjectionId}</td>
                                <td className="px-6 py-3">{fund.date}</td>
                                <td className="px-6 py-3">{fund.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Founding;
