import './NewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';
import {getCookie} from '../../../assets/functions';
import axios from 'axios';

const NewOrder = props => {

    const [loading, setLoading] = useState(false);
    
    const timingButtonHandler = (timing) => {
        const newOrder = {...props.order};

        newOrder.date_time = new Date(Date.now() + timing * 60 * 1000);
        newOrder.status = 'process';
        newOrder.customer = newOrder.customer.id;

        setLoading(true);
        const csrftoken = getCookie('csrftoken');

        axios.put('http://127.0.0.1:8000/order/' + newOrder.id + '/',
            newOrder,
            {
                headers: {'X-CSRFTOKEN': csrftoken,},
            },
        )
        .then(res => {
            console.log('SUCCESS updating order');
            setLoading(false);
        })
        .catch(err => {
            setLoading('error');
            console.log('ERROR updating order');
            console.log(err.message);
        })
        .then(() => {
            if(!loading){
                newOrder.customer = props.order.customer;
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

    let street, number, apartment;
    street = number = apartment = '';

    if(props.order.street)
        street = " " + props.order.street;
    if(props.order.number)
        number = " " + String(props.order.number);
    if(props.order.apartment)
        apartment = " דירה " + String(props.order.apartment);

    const content = (
        <div className="new-order-window">
            <div className="order-number"><b>#{props.order.id}</b></div>
            <div className="inside-window">
                <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                <div className="address">{props.order.city + street + number + apartment}</div>
                <hr/>
                <div className="food-section">
                    <i className="fas fa-hamburger"></i>
                    <div>
                        {props.order.dishesinorder.slice(0, 2).map(dishInOrder => {
                            let extras = [];
                            for (let i = 0; i < dishInOrder.extras.length; i++) {
                                if (i < dishInOrder.extras.length - 1)
                                    extras.push(dishInOrder.extras[i].name + ", ");
                                else
                                    extras.push(dishInOrder.extras[i].name);
                            }
                            return (
                                <div key={Math.random()}>
                                    <p className="food">{dishInOrder.dish.name + " × " + dishInOrder.quantity}</p>
                                    {extras}
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

    return content;
}

export default NewOrder;