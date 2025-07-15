import React, { useEffect, useState } from 'react';
import AuthHook from './Hooks/AuthHook';
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../Axios/AxiosSequere';
import { Bars } from 'react-loader-spinner';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ImageUpload } from './ImageUpload';
import toast from 'react-hot-toast';

const MyProfile = () => {
    const { user, loading } = AuthHook();
    const axiosSecure = AxiosSecure();
    const [edit, setEdit] = useState(false);
    const [zila, setZila] = useState(null)
    const [allupzila, setAllupzila] = useState([])


    const { data: allDisticts = [] } = useQuery({
        queryKey: 'alldisticts',
        enabled: edit,
        queryFn: (async () => {
            const zila = await axios.get('/disticts.json')
            return zila?.data[2]?.data

        })
    })




    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();


    const selectedDisticts = watch('district')
    useEffect(() => {

        if (selectedDisticts) {
            const findDisticts = allDisticts.find((item) => parseInt(item?.id) === parseInt(selectedDisticts))
            setZila(findDisticts?.name)

            const loadUpzila = async () => {
                const result = await axios.get('/Upzila.json')
                const finalUpzila = result?.data[2].data
                const filterUpzila = finalUpzila.filter((item) => parseInt(item?.district_id) === parseInt(selectedDisticts))
                setAllupzila(filterUpzila)
            }

            loadUpzila()

        }

    }, [selectedDisticts])

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['detailsUser', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const result = await axiosSecure.get(`/userdata?email=${user?.email}`);
            return result?.data;
        }
    });

    useEffect(() => {
        if (userData) {
            setValue('blood', userData.blood || '');
            setValue('upazila', userData.upazila || '');
            setValue('district', userData.district || '');
            setValue('role', userData.role || '');
            setValue('status', userData.status || '');
            setValue('name', userData.name || '');
            setValue('email', userData.email || '');
            setValue('image', userData?.image || '')
        }
    }, [userData, setValue]);

    const onSubmit = async (data) => {
        if (edit) {
            const { photo, upazila, blood, district } = data
            const image = await ImageUpload(photo[0])


            const editInformation = {email: user?.email, upazila, blood, district, image }


            try {

                const result = await axiosSecure.patch(`/updateprofile`, editInformation)
                if(result?.data?.modifiedCount){
                    toast.success("Your Profile Update Done!")
                }
            }
            catch {
                //
            }
        }
    };






    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Bars height="30" width="30" color="red" ariaLabel="bars-loading" visible={true} />
            </div>
        );
    }

    return (
        <div className="sm:w-4/5 mx-auto p-4 sm:p-6 bg-white rounded-sm shadow-sm relative text-black">
            {/* Edit Button */}
            <div className="absolute top-10 sm:top-4 right-4 text-red-600 text-xl cursor-pointer">
                <FaEdit onClick={() => setEdit(!edit)} />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-red-600 text-center">
                {edit ? 'Now you can update your profile.' : 'Welcome to Your Donor Profile'}
            </h1>

            {/* Profile Image */}
            {!edit && userData?.image && (
                <div className="flex justify-center mb-6 mt-4">
                    <img
                        src={userData.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-red-500 object-cover shadow-sm"
                    />
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                {/* Name */}
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        readOnly
                        className="w-full p-2 border border-red-500 rounded-sm bg-gray-100"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        readOnly
                        className="w-full p-2 border border-red-500 rounded-sm bg-gray-100"
                    />
                </div>

                {/* Image Upload (only when editing) */}
                {edit && (
                    <div>
                        <label className="block font-semibold">Your Image</label>
                        <input
                            type="file"
                            {...register('photo', { required: 'Image field is required' })}
                            className="w-full p-2 border border-red-500 rounded-sm bg-gray-100"
                        />
                        {
                            errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>
                        }
                    </div>
                )}

                {/* Blood Group */}
                {
                    !edit ? <div>
                        <label className="block font-semibold">Blood Group</label>
                        <input
                            type="text"
                            {...register('blood', { required: 'Blood group is required' })}
                            readOnly={!edit}
                            className={`w-full p-2 border rounded-sm ${errors.blood ? 'border-red-700' : 'border-red-500'} ${edit ? 'bg-white' : 'bg-gray-100'}`}
                        />
                        {errors.blood && <p className="text-sm text-red-600">{errors.blood.message}</p>}
                    </div> : <div>
                        <label className="block text-sm font-medium text-black mb-1">Blood Group</label>
                        <select
                            {...register('blood', { required: 'Select a blood group' })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select Blood Groupe</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>
                        {errors.blood && <p className="text-red-600 text-sm">{errors.blood.message}</p>}
                    </div>

                }


                {/* District */}
                {
                    !edit ? <div>
                        <label className="block font-semibold">District</label>
                        <input
                            type="text"
                            {...register('district', { required: 'District is required' })}
                            readOnly={!edit}
                            className={`w-full p-2 border rounded-sm ${errors.district ? 'border-red-700' : 'border-red-500'} ${edit ? 'bg-white' : 'bg-gray-100'}`}
                        />
                        {errors.district && <p className="text-sm text-red-600">{errors.district.message}</p>}
                    </div> : <div>
                        <label className="block text-sm font-medium text-black mb-1">District</label>

                        <select

                            {...register('district', { required: true })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select District</option>
                            {
                                allDisticts?.map((items) => {
                                    return <option key={parseInt(items?.id)} value={items?.id} > {items?.name} </option>
                                })
                            }
                        </select>
                        {
                            errors.district?.type === 'required' && <p className="text-red-600 text-sm">Distict is required</p>
                        }

                    </div>
                }




                {/* Upazila */}
                {
                    !edit ? <div>
                        <label className="block font-semibold">Upazila</label>
                        <input
                            type="text"
                            {...register('upazila', { required: 'Upazila is required' })}
                            readOnly={!edit}
                            className={`w-full p-2 border rounded-sm ${errors.upazila ? 'border-red-700' : 'border-red-500'} ${edit ? 'bg-white' : 'bg-gray-100'}`}
                        />
                        {errors.upazila && <p className="text-sm text-red-600">{errors.upazila.message}</p>}
                    </div> : <div>
                        <label className="block text-sm font-medium text-black mb-1">Upazila</label>
                        <select
                            {...register('upazila', { required: true })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select Upzila Plase</option>
                            {
                                allupzila?.map((item) => <option key={parseInt(item?.id)} value={item?.name}>{item?.name}</option>)
                            }
                            {/* Add more upazilas as needed */}
                        </select>
                        {
                            errors?.upazila?.type === 'required' &&
                            <p className="text-red-600 text-sm">Upzila is required</p>
                        }
                    </div>
                }



                {/* Role */}
                <div>
                    <label className="block font-semibold">Role</label>
                    <input
                        type="text"
                        {...register('role', { required: 'Role is required' })}
                        readOnly={edit}
                        className={`w-full p-2 border rounded-sm ${errors.role ? 'border-red-700' : 'border-red-500'} ${edit ? 'bg-white' : 'bg-gray-100'}`}
                    />
                    {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
                </div>

                {/* Status */}
                <div>
                    <label className="block font-semibold">Status</label>
                    <input
                        type="text"
                        {...register('status', { required: 'Status is required' })}
                        readOnly
                        className={`w-full p-2 border rounded-sm ${errors.status ? 'border-red-700' : 'border-red-500'} ${edit ? 'bg-white' : 'bg-gray-100'}`}
                    />
                    {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
                </div>

                {/* Account Created */}
                <div>
                    <label className="block font-semibold">Account Created</label>
                    <input
                        type="text"
                        value={userData?.createdAt || ''}
                        readOnly
                        className="w-full p-2 border border-red-500 rounded-sm bg-gray-100"
                    />
                </div>

                {/* Submit */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        disabled={!edit}
                        className={`px-6 w-full py-2 ${edit ? 'bg-gradient-to-r from-black to-red-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-sm transition`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
