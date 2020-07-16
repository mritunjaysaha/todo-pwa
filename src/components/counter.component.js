import React, { useState, useEffect } from "react";
// import { set } from "idb-keyval";
export default function Counter(props) {
    const date = props.date;
    const status = props.status;
    function getReamainingTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        if (status === "active" && total < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        } else {
            return {
                total,
                days,
                hours,
                minutes,
                seconds,
            };
        }
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
                Time Left: {time.days}:{time.hours}:{time.minutes}:
                {time.seconds}
            </p>
        </>
    );
}
