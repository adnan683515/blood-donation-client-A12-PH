import React from 'react';
import Hero from './Hero/Hero';
import Contact from '../Component/Contact';
import { GridSection } from './Hero/GridSeciton';
import { BloodStats } from './Hero/BloodStats';



const Home = () => {
    return (
        <div>
            <Hero></Hero>

            <div className='mt-10'>
                <BloodStats></BloodStats>
            </div>
            
            <GridSection></GridSection>
            <Contact></Contact>
        </div>

    );
};

export default Home;