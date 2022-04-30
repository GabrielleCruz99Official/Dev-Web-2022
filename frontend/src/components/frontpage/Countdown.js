import React, { useEffect, useState } from 'react';

function Countdown(targetDate){
    const countdownDate = new Date(targetDate).getTime();
    const [countdown, setCountdown] = useState(countdownDate - new Date().getTime())

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCountdown(countdownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(timeInterval);
    }, [countdownDate]);
    
    return(
        <>
        </>
    )
}

export default Countdown;
