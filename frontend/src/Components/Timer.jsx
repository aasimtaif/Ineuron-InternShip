import React, { useState, useEffect } from 'react'
import Lottie from "lottie-react";
import AnimationRunning from '../assets/AnimationRunning.json'
import styled from 'styled-components';
import axios from 'axios';

const Loader = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 100%; /* Full width for responsiveness */
margin: auto;
overflow: hidden; 
`
const TimerContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 150px; /* Adjust width as needed */
height: 150px; /* Adjust height as needed */
border-radius: 10%;
background-color: #ddd;
padding: 10px;
margin: 3rem auto;
`
const TimerText = styled.span`
font-size: 3rem;
font-weight: bold;
color: #333;
`
const Animation = styled(Lottie)`
width: 80%; /* Responsive width based on percentage */
  height: auto; /* Maintain aspect ratio */
  max-width: 450px;
  @media (max-width: 768px) {
    width: 100%; 
  }

`
const Message = styled.h1`
color: rgb(231, 32, 32);
font-size: 1rem;
font-weight: bold;
text-align: center;`
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
            <Loader className='loading-screen'>
                <Animation animationData={AnimationRunning} loop={true} className='animation' />
                <Message>Due to 15 min of inactivity the server went to sleeping mode please wait for 55 seconds while the serve restarts  </Message>
                <TimerContainer className="timer-container">
                    <TimerText className="timer-text">{formattedTime}</TimerText>
                </TimerContainer>
            </Loader> 
    )
}

export default Timer