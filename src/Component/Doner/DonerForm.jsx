import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthHook from '../Share/Hooks/AuthHook';

import axios from 'axios';
import AxiosSecure from './../../Axios/AxiosSequere';
import toast from 'react-hot-toast';
import RoleHook from '../Share/Hooks/RoleHook';
import { Bars } from 'react-loader-spinner';

const DonerForm = () => {

    const { user, loading } = AuthHook()
    const [allDisticts, setAllDisticts] = useState([])
    const [finalZila, setFinalZila] = useState(null)
    const [upliza, setUpzilaData] = useState([])
    const axiosSequere = AxiosSecure()
    const { 1: roleLoading, 2: status } = RoleHook()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {




        const { recipientName, address, requesterName, requesterEmail, upazila, hospital, bloodGroup, date, time, ampm, message } = data
        const timeFix = time + ' ' + ampm

        const requestInformations = { address, recipientName, requesterName, requesterEmail, finalZila, upazila, hospital, bloodGroup, date, timeFix, message, status: 'pending', createdAt: new Date() }



        try {
            //
            const result = await axiosSequere.post('/dontaionRequest', requestInformations)
           
            if (result?.data?.insertedId) {
                reset()
                toast.success('Donation Request Successfully!')

            }
        }
        catch {
            //
            console.log("error")
        }
    };

    useEffect(() => {
        const zila = async () => {
            const allDisticts = await axios.get('/disticts.json')
            setAllDisticts(allDisticts?.data[2]?.data)
        }
        zila()
    }, [])


    const selectedZila = watch('district')
    useEffect(() => {
        if (selectedZila) {
            const zilaName = allDisticts?.find((item) => parseInt(item?.id) == parseInt(selectedZila))

            setFinalZila(zilaName.name)
            const upzila = async () => {
                const UpdzilaData = await axios.get('/Upzila.json')
                const result = UpdzilaData?.data[2]?.data

                const finalFilterdata = result?.filter((item) => parseInt(item?.district_id) === parseInt(selectedZila))

                setUpzilaData(finalFilterdata)
            }
            upzila()

        }

    }, [selectedZila])




    if (roleLoading || loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Bars height="50" width="50" color="#ff0000" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl relative  mx-auto bg-white p-6 rounded-md shadow-md mt-10">
            <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Blood Donation Request Form</h2>
            <h1 className={` absolute -top-2 sm:top-6 right-2 text-white
            ${status !== 'Active' ? 'bg-red-600 px-3  py-1 rounded-sm' : 'bg-green-500 px-3 py-1 rounded-sm'}
                `}>Status:  {status} </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Requester Name (Read Only) */}
                <div>
                    <label className="block mb-1 font-semibold">Requester Name</label>
                    <input
                        type="text"
                        readOnly
                        value={user?.displayName}
                        disabled
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("requesterName")}
                    />
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Requester Email</label>
                    <input
                        type="email"
                        readOnly
                        value={user?.email}
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("requesterEmail")}
                    />
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Recipient Name</label>
                    <input
                        type="text"
                        placeholder="Enter recipient name"
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("recipientName", { required: "Recipient name is required" })}
                    />
                    {errors.recipientName && <p className="text-red-600 text-sm">{errors.recipientName.message}</p>}
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Recipient District</label>
                    <select
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("district", { required: "District is required" })}
                    >
                        <option value="">Select district</option>
                        {
                            allDisticts?.map((item) => <option value={parseInt(item?.id)} key={parseInt(item?.id)}> {item?.name} </option>)
                        }
                    </select>
                    {errors.district && <p className="text-red-600 text-sm">{errors.district.message}</p>}
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Recipient Upazila</label>
                    <select
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("upazila", { required: "Upazila is required" })}
                    >
                        <option value="">Select upazila</option>
                        {
                            upliza?.map((item) => <option value={item?.name} key={parseInt(item?.id)}> {item?.name} </option>)
                        }
                    </select>
                    {errors.upazila && <p className="text-red-600 text-sm">{errors.upazila.message}</p>}
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Hospital Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Dhaka Medical College Hospital"
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("hospital", { required: "Hospital name is required" })}
                    />
                    {errors.hospital && <p className="text-red-600 text-sm">{errors.hospital.message}</p>}
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Full Address Line</label>
                    <input
                        type="text"
                        placeholder="e.g. Zahir Raihan Rd, Dhaka"
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Blood Group</label>
                    <select
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("bloodGroup", { required: "Blood group is required" })}
                    >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    {errors.bloodGroup && <p className="text-red-600 text-sm">{errors.bloodGroup.message}</p>}
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Donation Date</label>
                    <input
                        type="date"
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("date", { required: "Donation date is required" })}
                    />
                    {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Donation Time</label>
                    <input
                        type="time"
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("time", { required: "Donation time is required" })}
                    />
                    {errors.time && <p className="text-red-600 text-sm">{errors.time.message}</p>}
                </div>


                <div className='w-full'>
                    <label className="block mb-1 font-semibold">Time </label>
                    <select {...register("ampm", { required: true })} className="border w-full border-red-500 p-2 rounded">
                        <option value="">Select Time option</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                    {
                        errors?.ampm?.type === 'required' && <p className="text-red-600 text-sm"> This field is required </p>
                    }
                </div>


                <div className="">
                    <label className="block mb-1 font-semibold">Request Message</label>
                    <textarea
                        rows="1"
                        placeholder="Explain why you need blood"
                        className="w-full border border-red-500 p-2 rounded"
                        {...register("message", { required: "Request message is required" })}
                    ></textarea>
                    {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
                </div>


                <div className="md:col-span-2 text-center">
                    <button
                        type="submit"
                        disabled={status !== 'Active'}
                        className={`
    w-full px-6 py-2 rounded text-white transition
    ${status !== 'Active' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}
    `}
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonerForm;
