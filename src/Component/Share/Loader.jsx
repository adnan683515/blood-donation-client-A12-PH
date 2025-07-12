import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex justify-center items-center'>
            <LineWave
            visible={true}
            height={'60'}
            width="60"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor="white"
            middleLineColor="black"
            lastLineColor="white"
        />
        </div>
    );
};

export default Loader;