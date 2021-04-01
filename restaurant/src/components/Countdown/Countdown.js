import './Countdown.css'
import React, {useState, useEffect} from 'react';

const Countdown = props => {

    const [now, setNow] = useState(new Date().getTime());

    const distance = props.countDownDate - now;

    console.log('[props.countDownDate] ' + props.countDownDate);
    console.log('[now] ' + now);
    console.log('[distance] ' + distance);

    const hours = Math.floor((Math.abs(distance) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((Math.abs(distance) % (1000 * 60 * 60)) / (1000 * 60));
    if(minutes < 10)
        minutes = "0" + minutes;
    let seconds = Math.floor((Math.abs(distance) % (1000 * 60)) / 1000);
    if(seconds < 10)
        seconds = "0" + seconds;

    useEffect(() => {
        setTimeout(() => {
            setNow(new Date().getTime());
        }, 1000);
    }, [now]);

    let content = (
        <div className="timer">
            {hours + ":" + minutes + ":" + seconds}
        </div>
    );

    

    if(distance < 0){
        content = (
            <div className="timer" style={{color: "red", fontWeight: "bold"}}>
                -{hours + ":" + minutes + ":" + seconds}
            </div>
        );
    }

    return content;
}

export default Countdown;