import React, { useEffect, useState } from 'react';
import Navber from './Navber';
import { Footer } from './Footer';
import { Outlet, useNavigation } from 'react-router';

import Marquee from "react-fast-marquee";
import { RingLoader } from 'react-spinners';
import { Bars } from 'react-loader-spinner';

const MainLayout = () => {
    const [laod, setLoad] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        setLoad(false)
    }, [])
    if (laod) return <div className='flex min-h-screen justify-center items-center '>
        <div>
            <Bars
                height="50"
                width="50"

                color="#ff0000" // white color
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    </div>
    return (
        <div >
            <Navber></Navber>
            <Marquee className='pt-20 text-[var(--primary-color)]'>
                "রক্ত দিন, জীবন বাঁচান — আপনার এক ফোঁটা রক্ত কারো পুরো পৃথিবী হতে পারে। আজই নিবন্ধন করুন রক্তদাতা হিসেবে!"
            </Marquee>

            <div className='min-h-[calc(100vh-440px)]   bg-gray-100'>
                {
                    navigation.state == 'loading' ? <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    /> : <Outlet></Outlet>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;