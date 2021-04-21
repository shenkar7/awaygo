import './TimingOrder.css';
import React, {useState} from 'react';

const TimingOrder = props => {

    const [timing, setTiming] = useState(15);
    const [choiceNumberValue, setChoiceNumberValue] = useState(15);

    // default is 15 minutes
    const choiceHandler = (value) => {
        if(value === 10) {
            setTiming(10);
            setChoiceNumberValue(10);
        }
        else if(value === 15 || value <= 0) {
            setTiming(15);
            setChoiceNumberValue(15);
        }
        else if(value === 20) {
            setChoiceNumberValue(20);
            setTiming(20);
        }
        else {
            setTiming(value);
            setChoiceNumberValue(value);
        }
    }


    let content = (
        <div>
            <div className="timing-choices">
                {timing === 10 ?
                    <div className="choice selected">
                        <span>דקות</span> <span>10</span>
                    </div>
                :
                    <div className="choice" onClick={() => choiceHandler(10)}>
                            <span>דקות</span> <span>10</span>
                    </div> 
                }
                {timing === 15 ?
                    <div className="choice selected">
                        <span>דקות</span> <span>15</span>
                    </div>
                :
                    <div className="choice" onClick={() => choiceHandler(15)}>
                            <span>דקות</span> <span>15</span>
                    </div> 
                }
                {timing === 20 ?
                    <div className="choice selected">
                        <span>דקות</span> <span>20</span>
                    </div>
                :
                    <div className="choice" onClick={() => choiceHandler(20)}>
                            <span>דקות</span> <span>20</span>
                    </div> 
                }
                <div className="number-choice">
                    <input type="number" value={choiceNumberValue} onChange={event => choiceHandler(event.target.value)} />
                    :אחר 
                </div>
            </div>
            <div className="time-order" onClick={() => props.timingButtonHandler(timing)}>
                {props.invalid ?
                <h1>תזמן הזמנה (נתונים חסרים / עגלה ריקה)</h1>
                : <h1>תזמן הזמנה</h1>
                }
            </div>
        </div>
    );

    return content;
}

export default TimingOrder;