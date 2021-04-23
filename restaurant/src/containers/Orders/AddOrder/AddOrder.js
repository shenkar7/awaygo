import React, {useState} from 'react';
import './AddOrder.css';
import axios from 'axios';
import {getCookie} from '../../../assets/functions';
import OrderDetails from './OrderDetails/OrderDetails';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';
import Spinner from '../../../components/Spinner/Spinner';
 

const AddOrder = props => {

    const [status, setStatus] = useState(null);

    const [order, setOrder] = useState({
        restaurant: props.restaurantId,
        city: "",
        street: "",
        number: "",
        apartment: "",
        customer: {
            phone_number: "",
            first_name: "",
            last_name: "",
            email: ""
        },
        remark: "",
        dishes_in_order: []
    });

    // valid only when all are true. updating in realtime on each onChange()
    const [validation, setValidation] = useState(
        {
            phone_number: false,
            email: true,    // not a required field, so true as default
            first_name: false,
            last_name: false,
            city: false,
            street: false,
            number: false,
            apartment: true, // not a required field, so true as default
            nonEmptyCart: false
        }
    );
    
    // updating on submit (to color the unvalid fields in red)
    const [submitValidation, setSubmitValidation] = useState(
        {
            phone_number: true,
            email: true,
            first_name: true,
            last_name: true,
            city: true,
            street: true,
            number: true,
            apartment: true,
            nonEmptyCart: true
        }
    );

    const [invalid, setInvalid] = useState(false);
    
    const allValid = () => {
        for (let key in validation) {
            if (!validation[key])
                return false;
        }
        return true;
    }

    const transformOrderToIds = order => {
        order.dishes_in_order.forEach(dishInOrder => {
            dishInOrder.dish = dishInOrder.dish.id;
            for(let i=0; i < dishInOrder.extras.length; i++) {
                dishInOrder.extras[i] = dishInOrder.extras[i].id;
            }
        });
        return order;
    }

    const submitHandler = (timing) => {
        if (allValid()){
            setStatus('loading');
            const orderWithIds = transformOrderToIds(order);
            orderWithIds.status = "process";
            orderWithIds.date_time = new Date(Date.now() + timing * 60 * 1000);
            const csrftoken = getCookie('csrftoken');
            axios.post('http://127.0.0.1:8000/order_add',
                orderWithIds,
                {
                    headers: {'X-CSRFTOKEN': csrftoken,},
                },
            )
            .then(res => {
                console.log("SUCCESS adding order")
                props.successClose();
                window.location.reload();
            })
            .catch(err => {
                console.log("ERROR posting order");
                console.log(err.message);
                setStatus("error");
            })
        }
        else {
            setSubmitValidation(validation);
            setInvalid(true);
        }
    }

    if (order.dishes_in_order.length === 0 && validation.nonEmptyCart){
        const newValidation = validation;
        newValidation.nonEmptyCart = false;
        setValidation(newValidation);
        setInvalid(true);
    }
    else if (order.dishes_in_order.length > 0 && !validation.nonEmptyCart){
        const newValidation = validation;
        newValidation.nonEmptyCart = true;
        setValidation(newValidation);
        setInvalid(false);
    }

    let content;

    if (status === 'loading'){
        content = (
            <div className = "spinner-or-error">
                <Spinner/>
            </div>
        );
    }
    else if (status === 'error'){
        content = (
            <div className = "spinner-or-error">
                <i className="fas fa-exclamation-triangle"></i>
                <br/>
                שגיאת תקשורת ביצירת ההזמנה
            </div>
        );
    }
    else {
        content = (
            <React.Fragment>
                <div className="add-order-window">
                    <div className="customer-and-menu">
                        <OrderDetails
                            order={order}
                            setOrder={setOrder}
                            validation={validation}
                            setValidation={setValidation}
                            validFields={submitValidation}
                            setValidFields={setSubmitValidation}
                            setInvalid={setInvalid}
                        />
                        <Menu setOrder={setOrder}/>
                    </div>
                    <div className="cart">
                        <Cart order={order} setOrder={setOrder}/>
                    </div>
                </div>
                <TimingOrder timingButtonHandler={submitHandler} invalid={invalid}/>
            </React.Fragment>
        );
    }

    return content;
}

export default AddOrder;