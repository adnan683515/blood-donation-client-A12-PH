import React from 'react';
import { Link, useNavigate } from 'react-router';
import AuthHook from '../../Component/Share/Hooks/AuthHook';

const Hero = () => {


    const { user } = AuthHook()




    return (
        <div>
            <div className="relative h-[80vh]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://i.ibb.co/Q3dj13QK/Black-and-Red-Minimalist-Halloween-Desktop-Wallpaper-1.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="text-center text-white max-w-xl space-y-2 sm:space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-rose-500">Welcome to Our Site</h1>
                        <p className="text-lg md:text-xl">
                            Discover stories, request donations, and help make a difference.
                        </p>
                        <p className="text-base md:text-lg text-gray-200">
                            Join a growing community of changemakers. Whether you're here to lend a helping hand or need support,
                            you're in the right place. Every small act of kindness counts.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                            <Link to={`${user ? '/searchdonor' : '/signup'}`} className="bg-gradient-to-r from-rose-500 to-red-600 w-[50%] text-white px-5 py-2 rounded">
                                Search Donors
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
