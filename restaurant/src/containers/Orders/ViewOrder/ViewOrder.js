import './ViewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import {getCookie} from '../../../assets/functions';

const ViewOrder = props => {

    const [status, setStatus] = useState(null);

    const backButtonHandler = (type) => {
        const newOrder = {...props.order};
        newOrder.customer = newOrder.customer.id;

        if (type === "cancel"){
            newOrder.status = 'canceled';
            newOrder.canceled_date_time = new Date(Date.now());
        }
        else if (type === "back"){
            switch (newOrder.status){
                case "ready":
                    newOrder.status = 'process';
                    newOrder.ready_date_time = null;
                    newOrder.process_date_time = new Date(Date.now());
                    break;
                case "sent":
                    newOrder.status = 'ready';
                    newOrder.sent_date_time = null;
                    newOrder.ready_date_time = new Date(Date.now());
                    break;
                case "delivered":
                    newOrder.status = 'sent';
                    newOrder.delivered_date_time = null;
                    newOrder.sent_date_time = new Date(Date.now());
                    break;
                default:
                    break;
            }
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
            console.log('SUCCESS updating the order');
            newOrder.customer = props.order.customer;
            props.orderUpdateHandler(newOrder);
            props.modalClose(false);
        })
        .catch(err => {
            setStatus('error');
            console.log('ERROR updating the order');
            console.log(err.message);
        })
    }

    let buttons = null;
    
    if(status === 'loading'){
        buttons = <span className='spinner'><Spinner/></span>;
    }
    else if (status === 'error'){
        buttons = (
            <div class="buttons">
                שגיאת תקשורת
            </div>
        );
    }
    else if (['ready', 'sent'].includes(props.order.status)){
        buttons = (
            <div class="buttons">
                <button className="back-button" onClick={() => backButtonHandler("back")}>החזר למצב הקודם</button>
                <button className="delete-button" onClick={() => backButtonHandler("cancel")}>מחק הזמנה</button>
            </div>
        );
    }
    else if (props.order.status !== "deleted"){
        buttons = (
            <div class="buttons">
                <button className="delete-button" onClick={() => backButtonHandler("cancel")}>מחק הזמנה</button>
            </div>
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
        <div className="view-order-window">
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
            {buttons}
        </div>
    );

    return content;
}

export default ViewOrder;