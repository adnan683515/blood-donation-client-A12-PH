import React from 'react';
import { Link } from 'react-router';
import AuthHook from '../../Component/Share/Hooks/AuthHook';


const Hero = () => {

    const { user } = AuthHook()
    return (
        <div>
            <div className="relative h-[80vh]">
                <div className="absolute inset-0">
                    <img
                        src="https://i.ibb.co/Q3dj13QK/Black-and-Red-Minimalist-Halloween-Desktop-Wallpaper-1.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>


                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div data-aos="zoom-in-up" className="max-w-3xl text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-4">
                            Life-Saving Blood, Just a Click Away
                        </h2>
                        <p className="text-white text-base sm:text-lg mb-6">
                            Connect with donors, respond to emergencies, and stay updated with your donation journey — all in one place.
                        </p>
                        <div className='flex justify-center items-center'>
                            <div className='flex gap-4 r'>
                                <Link to={'/searchdonor'}>
                                    <button className="bg-rose-600 hover:bg-rose-700 cursor-pointer text-white px-3 sm:px-6 py-3 rounded-md font-semibold transition-all">
                                        Search Donors
                                    </button>
                                </Link>

                                <Link to={user ? '' : "/signup"}>
                                    <button className="border-2 cursor-pointer border-rose-600 py-2  text-white px-3 sm:px-6 sm:py-3 rounded-md font-semibold transition-all">
                                        Join as a donor
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    );
};

export default Hero;
