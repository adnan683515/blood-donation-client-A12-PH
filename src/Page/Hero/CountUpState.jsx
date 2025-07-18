// CountUpStat.js
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountUpState = ({ end }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Ensure it runs only on client
        setShow(true);
    }, []);

    return (
        show && (
            <CountUp start={0} end={end} duration={3} separator="," />
        )
    );
};

export default CountUpState;
