import './ViewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import {getCookie} from '../../../assets/functions';

const getDateFromString = dateTime => {
    if (dateTime === null)
        return null;

    return (dateTime.substring(8, 10) + "/" + dateTime.substring(5, 7) + "/" + dateTime.substring(0, 4));
}

const getTimeFromString = dateTime => {
    if (dateTime === null)
        return null;

    if (typeof dateTime === "string")
        return(dateTime.substring(11, 16));

    let hours = dateTime.getHours().toString();
    if (hours.length === 1)
        hours = "0" + hours;

    let minutes = dateTime.getMinutes().toString();
    if (minutes.length === 1)
        minutes = "0" + minutes;
    
    return hours + ":" + minutes;
}

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
                <button className="cancel-button" onClick={() => backButtonHandler("cancel")}>בטל הזמנה</button>
            </div>
        );
    }
    else if (props.order.status !== "canceled" && props.order.status !== "delivered"){
        buttons = (
            <div class="buttons">
                <button className="cancel-button" onClick={() => backButtonHandler("cancel")}>בטל הזמנה</button>
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

    const creationTime = getTimeFromString(props.order.creation_date_time);
    const creationDate = getDateFromString(props.order.creation_date_time);
    const processTime = getTimeFromString(props.order.process_date_time);
    const timingTime = getTimeFromString(props.order.timing_date_time);
    const readyTime = getTimeFromString(props.order.ready_date_time);
    const sentTime = getTimeFromString(props.order.sent_date_time);
    const deliveredTime = getTimeFromString(props.order.delivered_date_time);
    const canceledTime = getTimeFromString(props.order.canceled_date_time);

    let datesSection = null;
    if(canceledTime)
        datesSection = (
            <React.Fragment>
                <div>{creationTime + " :נוצר ב"}</div>
                <div>{canceledTime + " :בוטל ב"}</div>
            </React.Fragment>
        );
    else{
        datesSection = (
            <React.Fragment>
                <div>{creationTime + " :נוצר ב"}</div>
                <div>{processTime ? processTime + " :בטיפול מ" : null}</div>
                <div>{timingTime ? timingTime + " :תוזמן ל" : null}</div>
                <div>{readyTime ? readyTime + " :מוכן מ" : null}</div>
                <div>{sentTime ? sentTime + " :יצא ב" : null}</div>
                <div>{deliveredTime ? deliveredTime + " :הגיע ב" : null}</div>
            </React.Fragment>
        );
    }

    const content = (
        <div className="view-order-window">
            <div className="order-number"><b>#{props.order.id}</b></div>
            <div className="inside-window">
                <div className="date-name-address">
                    <div className="creation-date">
                        {creationDate}
                    </div>
                    <div>
                        <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                        <div className="address">{props.order.city + street + number + apartment}</div>
                    </div>
                </div>
                <hr/>
                <div className="dates-section">
                    {datesSection}
                </div>
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