import React, { useState } from 'react';
import './OrderWindow.css';
import Countdown from '../../../components/Countdown/Countdown';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import {getCookie} from '../../../assets/functions';

const OrderWindow = props => {

    const [loading, setLoading] = useState(false);

    const nextButtonHandler = () => {
        const newOrder = {...props.order};
        newOrder.status = 'ready';
        setLoading(true);
        const csrftoken = getCookie('csrftoken');

        axios.put('http://127.0.0.1:8000/order/' + newOrder.id + '/',
            newOrder,
            {
                headers: {'X-CSRFTOKEN': csrftoken,},
            },
        )
        .then(res => {
            console.log('SUCCESS');
            setLoading(false);
        })
        .catch(err => {
            setLoading('error');
            console.log('ERROR');
            console.log(err);
        })
        .then(() => {
            if(!loading){
                props.orderUpdateHandler(newOrder);
            }
        })
    }

    let nextButton = null;
    if(props.order.status === "process"){
        if(loading === true){
            nextButton = <span className='spinner'><Spinner/></span>;
        }
        else if(loading === 'error'){
            nextButton = (
                <div class="next-button">
                    שגיאת תקשורת
                </div>
            );
        }
        else {
            nextButton = (
                <div class="next-button">
                    <button onClick={nextButtonHandler}>מוכן</button>
                </div>
            );
        }
    }

    return (
        <div className="order-window">
            <div onClick={props.click}>
                <div className="order-number-countdown">
                    <b>#{props.order.id}</b>
                    {props.order.status === 'process' ?
                        <Countdown countDownDate={Date.parse(props.order.date_time)}/>
                        : null
                    }
                </div>
                <div className="order-details">
                    <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                    <div className="address">{props.order.city}{props.order.street ? " " + props.order.street : null}{props.order.number ? " " + props.order.number : null}</div>
                    <hr/>
                    <div className="food-section">
                        <i className="fas fa-hamburger"></i>
                        <div>
                            {props.order.dishesinorder.slice(0, 2).map(dish => <p className="food">{dish.dish.name + " ×" + dish.quantity}</p>)}
                        </div>
                    </div>
                    {props.order.remark ?
                        <React.Fragment>
                            <hr/>
                            <div className="remark-section">
                                <i className="fas fa-exclamation-triangle"></i>
                                <div>
                                    <p className="remark">{props.order.remark}</p>
                                </div>
                            </div>
                        </React.Fragment>
                        : null   
                    }
                </div>
            </div>
            {nextButton}
        </div>
    );
};

export default OrderWindow;