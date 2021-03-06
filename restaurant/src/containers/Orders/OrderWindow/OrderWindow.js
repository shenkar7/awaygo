import React, { useState } from 'react';
import './OrderWindow.css';
import Countdown from '../../../components/Countdown/Countdown';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import {getCookie} from '../../../assets/functions';

const OrderWindow = props => {

    const [status, setStatus] = useState(null);

    const nextButtonHandler = () => {
        const newOrder = {...props.order};
        newOrder.status = 'ready';
        newOrder.ready_date_time = new Date(Date.now());
        newOrder.customer = newOrder.customer.id;

        setStatus('loading');
        const originURL = window.location.origin;
        const csrftoken = getCookie('csrftoken');

        axios.put(originURL + '/order/' + newOrder.id + '/',
            newOrder,
            {
                headers: {'X-CSRFTOKEN': csrftoken,},
            },
        )
        .then(res => {
            console.log('SUCCESS updating the order');
            newOrder.customer = props.order.customer;
            props.orderUpdateHandler(newOrder);
            setStatus(null);
        })
        .catch(err => {
            setStatus('error');
            console.log('ERROR updating the order');
            console.log(err.message);
        })
    }

    let nextButton = null;
    if(props.order.status === "process"){
        if(status === 'loading'){
            nextButton = <span className='spinner'><Spinner/></span>;
        }
        else if(status === 'error'){
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
            <div>
                <div className="order-number-countdown">
                    <b>#{props.order.id}</b>
                    {['process', 'ready'].includes(props.order.status) ?
                        <Countdown countDownDate={Date.parse(props.order.timing_date_time)}/>
                        : null
                    }
                </div>
                <div className="inside-window" onClick={props.click}>
                    <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                    <div className="address">{props.order.city + " " + props.order.street + " " + props.order.number}</div>
                    <hr/>
                    <div className="food-section">
                        <i className="fas fa-hamburger"></i>
                        <div>
                            {props.order.dishesinorder.slice(0, 2).map(dishInOrder => <p className="food">{dishInOrder.dish.name + " ×" + dishInOrder.quantity}</p>)}
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