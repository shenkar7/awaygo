import './NewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';
import {getCookie} from '../../../assets/functions';
import axios from 'axios';

const NewOrder = props => {

    const [loading, setLoading] = useState(false);
    console.log()
    const timingButtonHandler = (timing) => {
        const newOrder = {...props.order};
        // console.log(newOrder.date_time); //2021-04-01T09:15:17.329530+03:00
        // const newDateTime = new Date(Date.now() + timing * 60 * 1000);
        newOrder.date_time = new Date(Date.now() + timing * 60 * 1000);
        

        newOrder.status = 'process';
        // console.log(newOrder.date_time); //2021-04-06T06:47:45.001Z
        // newOrder.date_time = new Date('2021-04-01T09:55:17.329530+03:00');
        // console.log(newOrder.date_time);
        setLoading(true);
        const csrftoken = getCookie('csrftoken');

        axios.put('http://127.0.0.1:8000/order/' + newOrder.id + '/',
            newOrder,
            {
                headers: {'X-CSRFTOKEN': csrftoken,},
            },
        )
        .then(res => {
            console.log(res)
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
                props.modalClose(false);
            }
        })
    }

    let timingOrder = null;
    if(loading === true){
        timingOrder = <span className='spinner'><Spinner/></span>;
    }
    else if(loading === 'error'){
        timingOrder = (
            <div>
                שגיאת תקשורת
            </div>
        );
    }
    else {
        timingOrder = (
            <TimingOrder timingButtonHandler={timingButtonHandler}/>
        );
    }

    let street, number, floor, apartment;
    street = number = floor = apartment = '';

    if(props.order.address.street)
        street = " " + props.order.address.street;
    if(props.order.address.number)
        number = " " + String(props.order.address.number);
    if(props.order.address.floor)
        floor = " קומה " + String(props.order.address.floor);
    if(props.order.address.apartment)
        apartment = " דירה " + String(props.order.address.apartment);

    const content = (
        <div className="new-order-window">
            <div className="order-number"><b>#{props.order.id}</b></div>
            <div className="order-details">
                <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                <div className="address">{props.order.address.city + street + number + floor + apartment}</div>
                <hr/>
                <div className="food-section">
                    <i className="fas fa-hamburger"></i>
                    <div>
                        {props.order.dishesinorder.map(dish => <p className="food">{dish.dish.name + " ×" + dish.quantity}</p>)}
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

    return content;
}

export default NewOrder;