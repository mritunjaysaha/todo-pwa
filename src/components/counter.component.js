import React, { useState, useEffect } from "react";
export default function Counter(props) {
    const date = props.date;
    const status = props.status;
    function getReamainingTime(endtime) {
        // converts the string to millisecond
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    const [time, setTime] = useState(getReamainingTime(date));

    useEffect(() => {
        if (status === "active") {
            setTimeout(() => {
                setTime(getReamainingTime(date));
            }, 1000);
        }
    });

    return (
        <>
            <p>
                {time.days}:{time.hours}:{time.minutes}:{time.seconds}
            </p>
            {/* <p>{time.hours}</p>
            <p>{time.minutes}</p>
            <p>{time.seconds}</p> */}
        </>
    );
}
