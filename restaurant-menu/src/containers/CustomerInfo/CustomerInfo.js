import './CustomerInfo.css';
import React, {useContext, useState} from 'react';
import OrderContext from '../../OrderContext';
import axios from 'axios';

const CustomerInfo = props => {

    const [order, setOrder] = useContext(OrderContext);

    const [validation, setValidation] = useState(
        {
            phone_number: false,
            email: true,
            first_name: false,
            last_name: false,
            city: false,
            street: true,
            number: true,
            apartment: true
        }
    );
        
    const [submitValidation, setSubmitValidation] = useState(
        {
            phone_number: true,
            email: true,
            first_name: true,
            last_name: true,
            city: true,
            street: true,
            number: true,
            apartment: true
        }
    );

    const [invalidMessage, setInvalidMessage] = useState(null);

    const allValid = () => {
        for (let key in validation) {
            if (!validation[key])
                return false;
        }
        return true;
    }

    const phoneChangeHandler = event => {
        const newOrder = {...order};
        newOrder.customer.phone_number = event.target.value;

        const newValidation = {...validation};
        newValidation.phone_number = true;
        
        if (event.target.value.length !== 10)
            newValidation.phone_number = false;
        else if (event.target.value.substring(0, 2) !== "05")
            newValidation.phone_number = false;
        
        setOrder(newOrder);
        setValidation(newValidation);
    }

    const mailChangeHandler = event => {
        const newOrder = {...order};
        newOrder.customer.email = event.target.value;

        const newValidation = {...validation};
        newValidation.email = true;

        if ((!event.target.value.includes("@") || !event.target.value.includes(".")) && !(event.target.value === null || event.target.value === ""))
            newValidation.email = false;
        
        setOrder(newOrder);
        setValidation(newValidation);
    }

    const nameChangeHandler = (event, nameType) => {
        const newOrder = {...order};
        newOrder.customer[nameType] = event.target.value;

        const newValidation = {...validation};
        newValidation[nameType] = true;

        if (event.target.value === null || event.target.value === "")
            newValidation[nameType] = false;
        
        setOrder(newOrder);
        setValidation(newValidation);
    }

    const cityChangeHandler = event => {
        const newOrder = {...order};
        newOrder.city = event.target.value;

        const newValidation = {...validation};
        newValidation.city = true;

        if (event.target.value === null || event.target.value === "")
            newValidation.city = false;
        
        setOrder(newOrder);
        setValidation(newValidation);
    }

    const streetChangeHandler = event => {
        const newOrder = {...order};
        newOrder.street = event.target.value;
        setOrder(newOrder);
    }

    const apartmentOrNumberChangeHandler = (event, numberType) => {
        const newOrder = {...order};
        newOrder[numberType] = event.target.value;

        const newValidation = {...validation};
        newValidation[numberType] = true;

        if (event.target.value <= 0 && !(event.target.value === null || event.target.value === ""))
            newValidation[numberType] = false;
        
        setOrder(newOrder);
        setValidation(newValidation);
    }

    const remarkChangeHandler = event => {
        const newOrder = {...order};
        newOrder.remark = event.target.value;
        setOrder(newOrder);
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

    const submitHandler = event => {
        event.preventDefault();
        
        if (allValid()){
            console.log("VALID SUBMIT!")

            const orderWithIds = transformOrderToIds(order);
            console.log(orderWithIds)
            axios.post('http://127.0.0.1:8000/order_add', orderWithIds)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS!")

                // move page to success page!

            })
            .catch(err => {
                console.log(err.message);
            })
        }
        else{
            setSubmitValidation(validation);
            setInvalidMessage(
                <div className="invalidMessage">* נא לתקן פרטים המסומנים באדום</div>
            );
        }
    }

    const content = (
        <React.Fragment>
            <div className="back">
                <span onClick={props.back}>חזור לתפריט</span>
            </div>
            <div className="form-window">
                <form onSubmit={submitHandler}>

                    <h3>פרטי המזמין</h3>
                    <div className="details-section">
                        <div className={submitValidation.phone_number ? "info" : "info invalid"}>
                            <label>* טלפון נייד</label>
                            <input
                                type="tel"
                                placeholder="טלפון נייד"
                                value={order.customer.phone_number}
                                onChange={phoneChangeHandler}
                            />
                        </div>
                        <div className="info">
                            <label>אימייל</label>
                            <input
                                type="email"
                                placeholder="אימייל"
                                value={order.customer.email}
                                onChange={mailChangeHandler}
                            />
                        </div>
                        <div className={submitValidation.first_name ? "info" : "info invalid"}>
                            <label>* שם פרטי</label>
                            <input
                                type="text"
                                placeholder="שם פרטי"
                                value={order.customer.first_name}
                                onChange={event => nameChangeHandler(event, 'first_name')}
                            />
                        </div>
                        <div className={submitValidation.last_name ? "info" : "info invalid"}>
                            <label>* שם משפחה</label>
                            <input
                                type="text"
                                placeholder="שם משפחה"
                                value={order.customer.last_name}
                                onChange={event => nameChangeHandler(event, 'last_name')}
                            />
                        </div>
                    </div>
                    
                    <h3>כתובת</h3>
                    <div className="details-section">
                        <div className={submitValidation.city ? "info" : "info invalid"}>
                            <label>* עיר</label>
                            <input
                                type="text"
                                placeholder="עיר"
                                value={order.city}
                                onChange={cityChangeHandler}
                            />
                        </div>
                        <div className="info">
                            <label>רחוב</label>
                            <input
                                type="text"
                                placeholder="רחוב"
                                value={order.street}
                                onChange={streetChangeHandler}
                            />
                        </div>
                        <div className="info">
                            <label>מספר בית</label>
                            <input
                                type="number"
                                min="1" 
                                placeholder="מספר בית"
                                step="1"
                                value={order.number}
                                onChange={event => apartmentOrNumberChangeHandler(event, 'number')}
                            />
                        </div>
                        <div className="info">
                            <label>מספר דירה</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="מספר דירה"
                                value={order.apartment}
                                onChange={event => apartmentOrNumberChangeHandler(event, 'apartment')}
                            />
                        </div>
                    </div>

                    <h3>הערות להזמנה</h3>
                    <div className="remark-section">
                        <input
                            type="text"
                            placeholder="הערות"
                            value={order.remark}
                            onChange={event => remarkChangeHandler(event)}
                        />
                    </div>
                    <div className="submit-section">
                        <button type="submit">בצע הזמנה</button>
                    </div>
                    {invalidMessage}
                </form>
            </div>
        </React.Fragment>
    );

    return content;
}

export default CustomerInfo;