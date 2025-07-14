import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosSecure from '../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import SearchDonerDisplay from './SearchDonerDisplay';
import AuthHook from './Share/Hooks/AuthHook';

const SearchDoner = () => {
    const [district, setDistrict] = useState(null);
    const [upzila, setUpzilaData] = useState([]);
    const axiosSequre = AxiosSecure();
    const [doners, setDoners] = useState([]);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState(false);
    const {user} = AuthHook()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoader(true);
        setSearch(true);
        const { blood, upazila } = data;
        const searchInfo = { blood, upazila, district, role: 'Donor',email: user?.email };
        const queryString = new URLSearchParams(searchInfo).toString();
        try {
            const result = await axiosSequre.get(`/donor?${queryString}`);
            setDoners(result?.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    };

    const { data: allDisticts = [] } = useQuery({
        queryKey: ['disticts'],
        queryFn: async () => {
            const result = await axios.get('disticts.json');
            return result?.data[2]?.data;
        },
    });

    const selectedDsicts = watch('zila');

    useEffect(() => {
        if (selectedDsicts) {
            const zilaName = allDisticts?.find(
                (item) => parseInt(item?.id) === parseInt(selectedDsicts)
            );
            setDistrict(zilaName?.name);
            const fetchUpazila = async () => {
                const UpdzilaData = await axios.get('Upzila.json');
                const result = UpdzilaData?.data[2]?.data;
                const finalFilterdata = result.filter(
                    (item) => parseInt(item?.district_id) === parseInt(selectedDsicts)
                );
                setUpzilaData(finalFilterdata);
            };
            fetchUpazila();
        }
    }, [selectedDsicts, allDisticts]);

    return (
        <div>
            {/* Banner and Search Form */}
            <div
                className="bg-cover bg-center bg-no-repeat py-16 px-4"
                style={{
                    backgroundImage: `url('https://i.ibb.co/xtsJMSBn/Black-Orange-Simple-Open-Donation-Banner.png')`,
                }}
            >
                <p className="text-center text-sm sm:text-2xl sm:mb-4 text-white">
                    আপনার প্রয়োজন অনুযায়ী রক্তদাতা খুঁজে পেতে নিচের তথ্যগুলো পূরণ করুন।
                </p>

                <div className="flex justify-center items-center my-10">
                    <div className="w-full md:w-1/2 sm:p-6 rounded shadow-lg">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="sm:space-y-4 flex flex-wrap gap-2 sm:gap-4"
                        >
                            {/* Blood Group */}
                            <div className="flex-1 min-w-[150px]">
                                <label className="block mb-1 text-white">Blood Group</label>
                                <select
                                    {...register('blood', { required: 'Blood group is required' })}
                                    className="w-full p-2 bg-white border border-gray-300 rounded text-black"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                {errors.blood && (
                                    <p className="text-red-500 text-sm mt-1">{errors.blood.message}</p>
                                )}
                            </div>

                            {/* Zila */}
                            <div className="flex-1 min-w-[150px]">
                                <label className="block mb-1 text-white">Zila</label>
                                <select
                                    {...register('zila', { required: 'Zila is required' })}
                                    className="w-full p-2 bg-white border border-gray-300 rounded text-black"
                                >
                                    <option value="">Select District</option>
                                    {allDisticts?.map((item) => (
                                        <option key={item?.id} value={parseInt(item?.id)}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.zila && (
                                    <p className="text-red-500 text-sm mt-1">{errors.zila.message}</p>
                                )}
                            </div>

                            {/* Upazila */}
                            <div className="flex-1 min-w-[150px]">
                                <label className="block mb-1 text-white">Upazila</label>
                                <select
                                    {...register('upazila', { required: 'Upazila is required' })}
                                    className="w-full p-2 bg-white border border-gray-300 rounded text-black"
                                >
                                    <option value="">Select Upazila</option>
                                    {upzila?.map((item) => (
                                        <option key={item?.id} value={item?.name}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.upazila && (
                                    <p className="text-red-500 text-sm mt-1">{errors.upazila.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="w-full mt-2 flex justify-center">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer hover:scale-95 duration-1000 max-w-xs bg-gradient-to-r from-red-600 to-black text-white font-semibold py-2 px-4 rounded hover:bg-opacity-90"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Initial Info Message */}
            {!search && (
                <div className="flex flex-col w-[90%] md:w-[50%] mx-auto items-center justify-between gap-6 bg-white sm:p-6 rounded py-10 mt-10">
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-2">
                            If you want to see all available donors based on your search data,
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700">
                            Please click the <strong>Search</strong> button after filling out the form.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width="100"
                            height="100"
                            fill="#e11d48"
                        >
                            <path d="M32 2C32 2 12 22 12 36C12 48.1503 21.8497 58 34 58C46.1503 58 56 48.1503 56 36C56 22 32 2 32 2ZM34 52C25.1634 52 18 44.8366 18 36C18 30 25 18 32 10C39 18 46 30 46 36C46 44.8366 38.8366 52 34 52Z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Search Results */}
            <div>
                {loader ? (
                    <div className="flex justify-center items-center py-40">
                        <Bars height="50" width="50" color="#ff0000" visible={true} />
                    </div>
                ) : search ? (
                    doners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-[98%] mx-auto py-10">
                            {doners.map((donor) => <SearchDonerDisplay key={donor?._id} donor={donor}></SearchDonerDisplay> )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white rounded-xl shadow-md w-full max-w-md mx-auto mt-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-24 h-24 text-red-600 mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C8.13 2 5 6.06 5 9.5c0 3.78 5.55 9.09 6.22 9.76a1 1 0 001.56 0C13.45 18.59 19 13.28 19 9.5 19 6.06 15.87 2 12 2zm0 13.5c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm0-3.5c-.83 0-1.5-.67-1.5-1.5S11.17 9 12 9s1.5.67 1.5 1.5S12.83 12 12 12z" />
                            </svg>
                            <h2 className="text-xl md:text-2xl font-semibold text-red-700 text-center">
                                Blood Not Found
                            </h2>
                        </div>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default SearchDoner;
