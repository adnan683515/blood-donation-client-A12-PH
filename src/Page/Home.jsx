import React from 'react';
import Hero from './Hero/Hero';
import Contact from '../Component/Contact';
import { BloodStats } from './Hero/BloodStats';
import { FiCheckCircle } from "react-icons/fi";
import { Link } from 'react-router';
import { OurSomeSection } from './HomeFeatures/OurSomeSection';
import DonorsPublicPage from './HomeFeatures/DonorsPublicPage';
import Vedio from './HomeFeatures/Vedio';
// import { Button } from '@chakra-ui/react';





const Home = () => {
    return (
        <div>
            <Hero></Hero>


            <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 min-h-[400px]">


                    <div data-aos="zoom-in-up" className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-4">
                            Our Support Community
                        </h2>
                        <p className="text-gray-700 text-base sm:text-lg mb-6">
                            Our dedicated support team and community members ensure a smooth experience for everyone.
                        </p>
                        <ul className="pl-2 space-y-3 text-gray-700">
                            {[
                                "24/7 emergency donor coordination",
                                "Step-by-step blood request guide",
                                "Dedicated support team for every district",
                                "Instant notifications for urgent needs",
                                "Volunteer mentorship for new users",
                                "Live donor tracking & updates",
                                "Weekly check-ins and follow-ups"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <FiCheckCircle className="text-rose-600 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <Link to={'/searchdonor'}>
                                <button className="mt-6 cursor-pointer bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300">
                                    Join Our Team
                                </button>
                            </Link>
                        </div>
                    </div>


                    <div data-aos="zoom-in-up" className="w-full lg:w-1/2 h-full">
                        <img
                            src="https://i.ibb.co/TDm4zRhp/pexels-mikhail-nilov-7465699.jpg"
                            alt="Support"
                            className="w-full h-full object-cover rounded-xl shadow-md"
                        />
                    </div>
                </div>
            </div>


            <div className='mt-10'>
                <BloodStats></BloodStats>
            </div>



            <div data-aos="zoom-in-up" className='sm:w-[98%] mx-auto'>
                <div className='py-4'>
                    <div className="flex flex-row justify-between items-center px-4">
                        <h2 className="text-xl sm:text-3xl font-extrabold text-black">
                            Our Respective{' '}
                            <span className="text-rose-600">
                                Donors
                            </span>


                        </h2>
                        <Link to={'/searchdonor'}>
                            <button className="mt-4 sm:mt-0 px-4 sm:px-6 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition">
                                Find Donors
                            </button></Link>
                    </div>
                </div>
                <DonorsPublicPage></DonorsPublicPage>
            </div>

            <div>
                <OurSomeSection></OurSomeSection>
            </div>


            {/* <Button colorScheme="teal">Click Me</Button> */}

            <div className='sm:w-[98%] mx-auto'>
                <Vedio></Vedio>
            </div>




            <Contact></Contact>
        </div>

    );
};

export default Home;