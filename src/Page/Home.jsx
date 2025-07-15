import React from 'react';
import Hero from './Hero/Hero';
import Contact from '../Component/Contact';
import GridSeciton from './Hero/GridSeciton';

const Home = () => {
    return (
        <div>
            <Hero></Hero>

            <GridSeciton></GridSeciton>
            <Contact></Contact>
        </div>

    );
};

export default Home;