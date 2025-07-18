import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AxiosSequere from '../Axios/AxiosSequere';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

const EditDonationRequest = () => {
    const { id } = useParams();
    const axiosSequre = AxiosSequere();
    const [selectedZila, setSelecteZila] = useState(null);
    const [upzilaData, setUpzilaData] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { data: updateForDetails = {}, isLoading, refetch } = useQuery({
        queryKey: ['details', id],
        enabled: !!id,
        queryFn: async () => {
            const result = await axiosSequre.get(`/detailsrequest/${id}`);
            return result?.data;
        },
    });

    const { data: zila = [] } = useQuery({
        queryKey: 'disticts',
        queryFn: async () => {
            const result = await axios.get('/disticts.json');
            return result?.data[2]?.data;
        },
    });

    const selectedDistrict = watch('district');
    useEffect(() => {
        if (selectedDistrict) {
            const zilaName = zila?.find(
                (item) => parseInt(item?.id) === parseInt(selectedDistrict)
            );
            setSelecteZila(zilaName?.name);
            const upzila = async () => {
                const UpdzilaData = await axios.get('/Upzila.json');
                const result = UpdzilaData?.data[2]?.data;
                const finalFilterdata = result.filter(
                    (item) => parseInt(item?.district_id) === parseInt(selectedDistrict)
                );
                setUpzilaData(finalFilterdata);
            };
            upzila();
        }
    }, [selectedDistrict, zila]);

    const {
        address,
        bloodGroup,
        status,
        date,
        timeFix,
        finalZila,
        hospital,
        message,
        requesterEmail,
        upazila,
        requesterName,
        recipientName,
    } = updateForDetails;

    const onSubmit = async (data) => {

        data.id = id
        data.requesterEmail = requesterEmail,
            data.requesterName = requesterName
        data.status = status
        data.finalZila= selectedZila ? selectedZila : finalZila
   

        const result = await axiosSequre.put('/donationRequestUpdate', data)

        if (result?.data?.modifiedCount) {
            refetch()
            toast.success('Your Information Update Successfully!')

        }
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center">
        <Bars height="50" width="50" color="#e11d48" ariaLabel="bars-loading" visible={true} />
    </div>;

    return (
        <div>
            <div className="max-w-4xl relative mx-auto bg-white p-6 rounded-md shadow-md mt-10">
                <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
                    Update Your Blood Donation Request Form
                </h2>

                <h1 className="absolute -top-2 sm:top-6 right-2 text-white bg-green-500 px-3 py-1 rounded-sm">
                    Status: Active
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Requester Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Requester Name</label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={requesterName}
                            {...register('requesterName')}
                            className="w-full border border-red-500 p-2 rounded"
                        />
                    </div>

                    {/* Requester Email */}
                    <div>
                        <label className="block mb-1 font-semibold">Requester Email</label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={requesterEmail}
                            {...register('requesterEmail')}
                            className="w-full border border-red-500 p-2 rounded"
                        />
                    </div>

                    {/* Recipient Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Recipient Name</label>
                        <input
                            type="text"
                            defaultValue={recipientName}
                            {...register('recipientName', { required: 'Recipient name is required' })}
                            placeholder="Enter recipient name"
                            className="w-full border border-red-500 p-2 rounded"
                        />
                        {errors.recipientName && (
                            <p className="text-red-600 text-sm">{errors.recipientName.message}</p>
                        )}
                    </div>

                    {/* District */}
                    <div>
                        <label className="block mb-1 font-semibold">Recipient District</label>
                        <select
                            {...register('district', { required: 'District is required' })}
                            defaultValue={finalZila}
                            className="w-full border border-red-500 p-2 rounded"
                        >
                            <option value={finalZila}> {finalZila} </option>
                            {zila?.map((item) => (
                                <option key={parseInt(item?.id)} value={parseInt(item?.id)}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                        {errors.district && <p className="text-red-600 text-sm">{errors.district.message}</p>}
                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="block mb-1 font-semibold">Recipient Upazila</label>
                        <select
                            {...register('upazila', { required: 'Upazila is required' })}
                            defaultValue={upazila}
                            className="w-full border border-red-500 p-2 rounded"
                        >
                            <option value={upazila}> {upazila} </option>
                            {upzilaData?.map((item) => (
                                <option key={parseInt(item?.id)} value={item?.name}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                        {errors.upazila && <p className="text-red-600 text-sm">{errors.upazila.message}</p>}
                    </div>

                    {/* Hospital */}
                    <div>
                        <label className="block mb-1 font-semibold">Hospital Name</label>
                        <input
                            type="text"
                            defaultValue={hospital}
                            {...register('hospital', { required: 'Hospital name is required' })}
                            placeholder="e.g. Dhaka Medical College Hospital"
                            className="w-full border border-red-500 p-2 rounded"
                        />
                        {errors.hospital && <p className="text-red-600 text-sm">{errors.hospital.message}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-semibold">Full Address Line</label>
                        <input
                            type="text"
                            defaultValue={address}
                            {...register('address', { required: 'Address is required' })}
                            placeholder="e.g. Zahir Raihan Rd, Dhaka"
                            className="w-full border border-red-500 p-2 rounded"
                        />
                        {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block mb-1 font-semibold">Blood Group</label>
                        <select
                            defaultValue={bloodGroup}
                            {...register('bloodGroup', { required: 'Blood group is required' })}
                            className="w-full border border-red-500 p-2 rounded"
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
                        {errors.bloodGroup && (
                            <p className="text-red-600 text-sm">{errors.bloodGroup.message}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-1 font-semibold">Donation Date</label>
                        <input
                            type="date"
                            defaultValue={date}
                            {...register('date', { required: 'Donation date is required' })}
                            className="w-full border border-red-500 p-2 rounded"
                        />
                        {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block mb-1 font-semibold">Donation Time</label>
                        <input
                            type="time"
                            defaultValue={timeFix?.split(' ')[0]}
                            {...register('time', { required: 'Donation time is required' })}
                            className="w-full border border-red-500 p-2 rounded"
                        />
                        {errors.time && <p className="text-red-600 text-sm">{errors.time.message}</p>}
                    </div>

                    {/* AM/PM */}
                    <div>
                        <label className="block mb-1 font-semibold">Time</label>
                        <select
                            {...register('ampm', { required: 'Please select AM or PM' })}
                            defaultValue={timeFix?.split(' ')[1]}
                            className="w-full border border-red-500 p-2 rounded"
                        >
                            <option value="">Select Time option</option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                        {errors.ampm && <p className="text-red-600 text-sm">{errors.ampm.message}</p>}
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold">Request Message</label>
                        <textarea
                            rows="2"
                            defaultValue={message}
                            {...register('message', { required: 'Request message is required' })}
                            placeholder="Explain why you need blood"
                            className="w-full border border-red-500 p-2 rounded"
                        ></textarea>
                        {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
                    </div>

                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="w-full px-6 py-2 rounded text-white bg-red-600 hover:bg-red-700 transition"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDonationRequest;
