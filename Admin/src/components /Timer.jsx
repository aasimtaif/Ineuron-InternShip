import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import AnimationRunning from '../assets/AnimationRunning.json';
import axios from 'axios';

function Timer() {
    const [seconds, setSeconds] = useState(55);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;

    return (
        <div className="loading-screen flex flex-col justify-center items-center w-full overflow-hidden">
            <Lottie animationData={AnimationRunning} loop={true} className="w-[450px] h-[450px]" />
            <div className="timer-container flex justify-center items-center w-150 h-150 rounded-full bg-gray-200 p-4">
                <span className="timer-text text-3xl font-bold text-gray-800">{formattedTime}</span>
            </div>
            <p className="text-center text-red-500 font-bold text-sm mt-4">Due to 15 min of inactivity the server went to sleeping mode please wait for 55 seconds while the serve restarts</p>
        </div>
    );
}

export default Timer;
