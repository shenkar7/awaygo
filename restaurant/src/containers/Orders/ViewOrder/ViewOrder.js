import './ViewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import {getCookie} from '../../../assets/functions';

const ViewOrder = props => {

    const [loading, setLoading] = useState(false);

    const backButtonHandler = () => {
        const newOrder = {...props.order};
        newOrder.customer = newOrder.customer.id;

        switch (newOrder.status){
            case "ready":
                newOrder.status = 'process';
                break;
            case "sent":
                newOrder.status = 'ready';
                break;
            case "delivered":
                newOrder.status = 'sent';
                break;
            default:
                break;
        }
        
        setLoading(true);
        const csrftoken = getCookie('csrftoken');

        axios.put('http://127.0.0.1:8000/order/' + newOrder.id + '/',
            newOrder,
            {
                headers: {'X-CSRFTOKEN': csrftoken,},
            },
        )
        .then(res => {
            console.log('SUCCESS updating the order');
            setLoading(false);
        })
        .catch(err => {
            setLoading('error');
            console.log('ERROR updating the order');
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

    let backButton = null;
    if(props.order.status !== "process"){
        if(loading === true){
            backButton = <span className='spinner'><Spinner/></span>;
        }
        else if(loading === 'error'){
            backButton = (
                <div class="back-button">
                    שגיאת תקשורת
                </div>
            );
        }
        else {
            backButton = (
                <div class="back-button">
                    <button onClick={backButtonHandler}>החזר למצב הקודם</button>
                </div>
            );
        }
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
            <div className="order-details">
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
            {backButton}
        </div>
    );

    return content;
}

export default ViewOrder;