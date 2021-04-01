import React from 'react';
import './OrderWindow.css';
import Countdown from '../../../components/Countdown/Countdown';

const OrderWindow = props => {

    let nextButton = null;
    if(props.order.status == "process"){
        nextButton = (
            <div class="next-button">
                <button>מוכן</button>
            </div>
        );
    }

    return (
        <div className="order-window" onClick={props.click}>
            <div className="order-number-countdown">
                <b>#{props.order.id}</b>
                <Countdown countDownDate={new Date(2021, 3, 1, 12, 36, 30).getTime()}/>
            </div>
            <div className="order-details">
                <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                <div className="address">{props.order.address.city + " " + props.order.address.street + " " + props.order.address.number}</div>
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
            {nextButton}
        </div>
    );
};

export default OrderWindow;