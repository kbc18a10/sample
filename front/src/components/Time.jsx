import React,{useState, useEffect} from 'react';
import { useCountdownTimer } from 'use-countdown-timer'

const Time = ({gameEnd}) => {
    const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
        timer: 1000 * 60,
    });

    useEffect(()=>{
        start();
    },[])

    return (
        <div className="time">
            {((countdown/1000) != 0) ? (countdown/1000): gameEnd(true)}
        </div>
    )
}

export default Time;