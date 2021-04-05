import './ViewOrder.css';
import React, {useState} from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';

const ViewOrder = props => {

    const [loading, setLoading] = useState(false);

    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
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


    const newOrder = {...props.order};
    console.log('before ' + newOrder.status);
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
    console.log('after ' + newOrder.status);

    const backButtonHandler = () => {
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
        backButton = (
            <div class="back-button">
                <button onClick={backButtonHandler}>החזר למצב הקודם</button>
            </div>
        );
    }

    const content = (
        <div className="view-order-window">
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
            {backButton}
        </div>
    );

    return content;
}

export default ViewOrder;