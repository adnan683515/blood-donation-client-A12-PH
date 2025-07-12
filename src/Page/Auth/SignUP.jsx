import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUpload } from '../../Component/Share/ImageUpload';
import { LineWave } from 'react-loader-spinner';
import Loader from '../../Component/Share/Loader';
import { useQuery } from '@tanstack/react-query';
import rider from '../../assets/bloodRider.json'
import axios from 'axios';
import Lottie from 'lottie-react';
import AuthHook from '../../Component/Share/Hooks/AuthHook';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import AxiosHook from '../../Axios/AxiosHook';

const SignUP = () => {
    const [loader, setLoader] = useState(false)
    const [zila, setZila] = useState([])
    const [upzilaData, setUpzilaData] = useState([])
    const [selectedZila, setSelecteZila] = useState(null)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const { handleSignup, handleUpdate } = AuthHook()
    const axiosHook = AxiosHook()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { data: allDisticts = [], isLoading } = useQuery({
        queryKey: 'disticts',
        queryFn: async () => {
            const result = await axios.get('disticts.json')
            return result?.data[2]?.data
        }
    })

    useEffect(() => {
        setZila(allDisticts)
    }, [isLoading])



    const handleRegister = async (data) => {
        setLoader(true)
        setError("")
        const avatarFile = data.avatar[0];





        if (data?.password !== data?.confirm_password) {
            setLoader(false)
            toast.error("Your password doesn't match")
            return
        }

        const imageUrl = await ImageUpload(avatarFile)


        const userInformation = {
            name: data?.username,
            email: data?.email,
            blood: data?.blood,
            upazila: data?.upazila,
            district: selectedZila,
            image: imageUrl,
            role: 'Donor',
            status:'Active',
            createdAt: new Date().toLocaleString(),
            last_Login: new Date().toLocaleTimeString()
        }

        handleSignup(data?.email, data?.password)
            .then(() => {

                handleUpdate({ displayName: userInformation?.name, photoURL: imageUrl })
                    .then(async () => {

                        const result = await axiosHook.post('/user', userInformation)
                        console.log(result)
                        setLoader(false)
                        toast.success('Registration successfully!')
                        navigate('/')
                    })
                    .catch((erro) => {
                        setLoader(false)
                        setError(erro.message)
                    })
            })
            .catch((error) => {
                setLoader(false)
                setError(error.message)
            })


    };



    const selectedDistrict = watch('district')
    useEffect(() => {
        if (selectedDistrict) {
            const zilaName = zila?.find((item) => parseInt(item?.id) == parseInt(selectedDistrict))
            setSelecteZila(zilaName.name)
            const upzila = async () => {
                const UpdzilaData = await axios.get('Upzila.json')
                const result = UpdzilaData?.data[2]?.data
                const finalFilterdata = result.filter((item) => parseInt(item?.district_id) === parseInt(selectedDistrict))
                setUpzilaData(finalFilterdata)
            }
            upzila()

        }
    }, [selectedDistrict]);

    return (
        <div className="flex shadow-xl shadow-orange-50 items-center py-5 md:flex-row flex-col  justify-around  px-4">
            {
                error && toast.error(error)
            }


            <div className=' w-[50%]   sm:w-[30%]   '>

                <Lottie className='w-full ' animationData={rider}></Lottie>
            </div>
            <div className="bg-white px-8 py-5 rounded-2xl shadow-md max-w-xl">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Registration page</h2>

                <form onSubmit={handleSubmit(handleRegister)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                        <input
                            {...register('username', { required: 'Name is required' })}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Email</label>
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Avatar (Image File)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('avatar', { required: 'Avatar is required' })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.avatar && <p className="text-red-600 text-sm">{errors.avatar.message}</p>}
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Blood Group</label>
                        <select
                            {...register('blood', { required: 'Select a blood group' })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select</option>
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

                    {/* District */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">District</label>

                        <select

                            {...register('district', { required: true })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select District</option>
                            {
                                zila?.map((items) => {
                                    return <option key={parseInt(items?.id)} value={items?.id} > {items?.name} </option>
                                })
                            }
                        </select>
                        {
                            errors.district?.type === 'required' && <p className="text-red-600 text-sm">Distict is required</p>
                        }

                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Upazila</label>
                        <select
                            {...register('upazila', { required: true })}
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select Upazila</option>
                            {
                                upzilaData?.map((item) => <option key={parseInt(item?.id)} value={item?.name}>{item?.name}</option>)
                            }
                            {/* Add more upazilas as needed */}
                        </select>
                        {
                            errors?.upazila?.type === 'required' &&
                            <p className="text-red-600 text-sm">Upzila is required</p>
                        }
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Password</label>
                        <input
                            {...register('password', {
                                required: 'Password is required', pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        'Password must be 8+ characters with uppercase, lowercase, number, and special character',
                                },
                            })}

                            type={show ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Confirm Password</label>
                        <input
                            {...register('confirm_password', { required: 'Please confirm password' })}
                            type="password"
                            placeholder="Confirm password"
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.confirm_password && (
                            <p className="text-red-600 text-sm">{errors.confirm_password.message}</p>
                        )}
                    </div>

                    <div>
                        <input onChange={() => setShow(!show)} type="checkbox" name="" id="" /> <span>show password</span>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                        >
                            {
                                loader ? <Loader></Loader> : ' Create Account'
                            }
                        </button>
                    </div>
                    <div className='md:col-span-2 flex justify-end'>
                        <h1>You Have Already an account? <span className='underline text-red-600'> <Link to={'/login'}>login</Link> </span> </h1>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUP;
