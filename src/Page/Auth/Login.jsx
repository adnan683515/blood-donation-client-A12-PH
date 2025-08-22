import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import circle from '../../assets/circle.json';
import AuthHook from '../../Component/Share/Hooks/AuthHook';
import toast from 'react-hot-toast';

const Login = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { handleLogin, setLoading } = AuthHook();
    const [adminClick, setAdminClick] = useState(null);

 
    const onLogin = (data) => {
        setError('');
        handleLogin(data?.email, data?.password)
            .then(() => {
                navigate('/');
                toast.success('Login Successfully');
            })
            .catch((err) => {
                setLoading(false);
                setError(err?.message);
                toast.error(err?.message);
            });
    };


    const handleRoleClick = (role) => {
        setAdminClick(role);
        if (role === 'Admin') {
            setValue('email', 'golamfaruk680@gmail.com');
            setValue('password', '683515adnan@A1');
        } else if (role === 'Volunteer') {
            setValue('email', 'gfadnan068@gmail.com');
            setValue('password', '683515adnan@A1');
        }
    };

    return (
        <div className="flex shadow-xl shadow-orange-50 items-center py-10 md:flex-row flex-col justify-around px-4">
            
            <div className="w-[50%] sm:w-[30%]">
                <Lottie animationData={circle} />
            </div>

        
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>

            
                <div className="flex gap-4 mb-4 justify-center">
                    <button
                        type="button"
                        onClick={() => handleRoleClick('Volunteer')}
                        className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${adminClick === 'Volunteer'
                                ? 'bg-rose-600 text-white'
                                : 'bg-rose-200 text-black hover:bg-rose-300'
                            }`}
                    >
                        Volunteer
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleClick('Admin')}
                        className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${adminClick === 'Admin'
                                ? 'bg-rose-600 text-white'
                                : 'bg-rose-200 text-black hover:bg-rose-300'
                            }`}
                    >
                        Admin
                    </button>
                </div>

          
                {adminClick && (
                    <p className="text-center text-sm text-gray-600 mb-4">
                        You selected <span className="font-semibold">{adminClick}</span>
                    </p>
                )}

           
                <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Password</label>
                        <input
                            type={show ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Show password */}
                    <div className="flex items-center gap-2">
                        <input
                            onChange={() => setShow(!show)}
                            type="checkbox"
                            id="showpass"
                            className="cursor-pointer"
                        />
                        <label htmlFor="showpass" className="text-sm cursor-pointer">
                            Show password
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary-color)] hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Sign In
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-[var(--primary-color)] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
