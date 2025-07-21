import React from 'react';
import vedio from '../../assets/Vedio.mp4';

const Vedio = () => {
    return (
        <div className='w-[80%] mx-auto my-10'>
    
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-rose-600">
                A Doctor's Effort: Matching Blood for a Life-Saving Donation
            </h2>


            <video
                width="100%"
                autoPlay
                loop
                muted
                controls
                className="rounded-xl shadow-lg"
                poster="thumbnail.jpg"
            >
                <source src={vedio} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Vedio;
