import './NewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';
import {getCookie} from '../../../assets/functions';
import axios from 'axios';

const NewOrder = props => {

    const [status, setStatus] = useState(null);
    
    const timingButtonHandler = (value) => {
        const newOrder = {...props.order};
        newOrder.customer = newOrder.customer.id;

        if(value){
            newOrder.process_date_time = new Date(Date.now());
            newOrder.timing_date_time = new Date(Date.now() + value * 60 * 1000);
            newOrder.status = 'process';
        }
        else {
            newOrder.status = 'canceled';
            newOrder.canceled_date_time = new Date(Date.now());
        }
        
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
            console.log('SUCCESS updating order');
            newOrder.customer = props.order.customer;
            setStatus(null);
            props.orderUpdateHandler(newOrder);
            props.modalClose(false);
        })
        .catch(err => {
            setStatus('error');
            console.log('ERROR updating order');
            console.log(err.message);
        })
    }

    let content = null;
    let timingOrder = null;

    if(status === 'error'){
        content = (
            <div className="new-order-window error">
                שגיאת תקשורת
            </div>
        );
    }
    else {
        if (status === 'loading'){
            timingOrder = <span className='spinner'><Spinner/></span>;
        }
        else {
            timingOrder = (
                <React.Fragment>
                    <TimingOrder timingButtonHandler={timingButtonHandler}/>
                    <div className="cancel-button-section">
                        <div onClick={() => timingButtonHandler(null)}>בטל הזמנה</div>
                    </div>
                </React.Fragment>
            );
        }

        let street, number, apartment;
        street = number = apartment = '';
    
        if(props.order.street)
            street = " " + props.order.street;
        if(props.order.number)
            number = " " + String(props.order.number);
        if(props.order.apartment)
            apartment = " דירה " + String(props.order.apartment);

        content = (
            <div className="new-order-window">
                <div className="order-number"><b>#{props.order.id}</b></div>
                <div className="inside-window">
                    <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                    <div className="address">{props.order.city + street + number + apartment}</div>
                    <hr/>
                    <div className="food-section">
                        <i className="fas fa-hamburger"></i>
                        <div>
                            {props.order.dishesinorder.map(dishInOrder => {
                                let extras = [];
                                for (let i = 0; i < dishInOrder.extras.length; i++) {
                                    if (i < dishInOrder.extras.length - 1)
                                        extras.push(dishInOrder.extras[i].name + ", ");
                                    else
                                        extras.push(dishInOrder.extras[i].name);
                                }
                                let remark = null;
                                if (dishInOrder.remark)
                                    remark = <p className="food">{dishInOrder.remark}{" "}<i className="fas fa-exclamation-triangle"></i></p>
                                return (
                                    <div key={Math.random()}>
                                        {dishInOrder.dish.name + " × " + dishInOrder.quantity}
                                        <p className="food">{extras}</p>
                                        {remark}
                                    </div>
                                );
                            })}
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
                {timingOrder}
            </div>
        );
    }

    return content;
}

export default NewOrder;