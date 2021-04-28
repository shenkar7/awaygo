import './CustomerInfo.css';
import React, {useContext, useState} from 'react';
import OrderContext from '../../OrderContext';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

const CustomerInfo = props => {

    const [order, setOrder] = useContext(OrderContext);

    const [status, setStatus] = useState(null);

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
            apartment: true // not a required field, so true as default
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

    const onChangeHandler = (event, fieldName) => {
        const newOrder = {...order};
        newOrder.customer = {...order.customer};
        const newValidation = {...validation};

        if (fieldName === "phone_number"){
            newOrder.customer.phone_number = event.target.value;
            newValidation.phone_number = true;
            const regex = /^[0-9]+$/;
            if (!regex.test(event.target.value))
                newValidation.phone_number = false;
            else if (event.target.value.length !== 10)
                newValidation.phone_number = false;
            else if (event.target.value.substring(0, 2) !== "05")
                newValidation.phone_number = false;
        }

        if (fieldName === "email"){
            newOrder.customer.email = event.target.value;
            newValidation.email = true;
            if ((!event.target.value.includes("@") || !event.target.value.includes(".")) && !(event.target.value === null || event.target.value === ""))
                newValidation.email = false;
        }

        if (["first_name", "last_name"].includes(fieldName)){
            newOrder.customer[fieldName] = event.target.value;
            newValidation[fieldName] = true;
            if (event.target.value === null || event.target.value === "")
                newValidation[fieldName] = false;
        }

        if (["city", "street"].includes(fieldName)){
            newOrder[fieldName] = event.target.value;
            newValidation[fieldName] = true;
            if (event.target.value === null || event.target.value === "")
                newValidation[fieldName] = false;
        }

        if (fieldName === "number"){
            newOrder.number = event.target.value;
            newValidation.number = false;
            if (event.target.value > 0 )
                newValidation.number = true;
        }

        if (fieldName === "apartment"){
            newOrder.apartment = event.target.value;
            newValidation.apartment = true;

            if (event.target.value <= 0 && !(event.target.value === null || event.target.value === ""))
                newValidation.apartment = false;
        }

        if (fieldName === "remark")
            newOrder.remark = event.target.value;

        setOrder(newOrder);
        setValidation(newValidation);
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

    let originURL = window.location.origin;
    originURL = "http://127.0.0.1:8000"; // For local run

    const submitHandler = event => {
        event.preventDefault();
        
        if (allValid()){
            setStatus("loading");
            const orderWithIds = transformOrderToIds(order);
            axios.post(originURL + '/order_add', orderWithIds)
            .then(res => {
                console.log("SUCCESS adding order")
                props.setPage({page: "success", info: res.data.id})
            })
            .catch(err => {
                console.log("ERROR posting order");
                console.log(err.message);
                setStatus("error");
            })
        }
        else{
            setSubmitValidation(validation);
            setInvalidMessage(
                <div className="invalidMessage">* נא לתקן פרטים המסומנים באדום</div>
            );
        }
    }

    let content = null;
    if (!status) {
        content = (
            <React.Fragment>
                <div className="back">
                    <span onClick={props.back}>חזור לתפריט</span>
                </div>
                <div className="form-window">
                    <form onSubmit={submitHandler}>

                        <h3>פרטי המזמין</h3>
                        <div className="details-section">
                            <div className="input-couple">
                                <div className={submitValidation.phone_number ? "info" : "info invalid"}>
                                    <label>* טלפון נייד</label>
                                    <input
                                        type="tel"
                                        placeholder="טלפון נייד"
                                        value={order.customer.phone_number}
                                        onChange={event => onChangeHandler(event, "phone_number")}
                                    />
                                </div>
                                <div className="seperator"></div>
                                <div className="info">
                                    <label>אימייל</label>
                                    <input
                                        type="email"
                                        placeholder="אימייל"
                                        value={order.customer.email}
                                        onChange={event => onChangeHandler(event, "email")}
                                    />
                                </div>
                            </div>
                            <div className="seperator"></div>
                            <div className="input-couple">
                                <div className={submitValidation.first_name ? "info" : "info invalid"}>
                                    <label>* שם פרטי</label>
                                    <input
                                        type="text"
                                        placeholder="שם פרטי"
                                        value={order.customer.first_name}
                                        onChange={event => onChangeHandler(event, "first_name")}
                                    />
                                </div>
                                <div className="seperator"></div>
                                <div className={submitValidation.last_name ? "info" : "info invalid"}>
                                    <label>* שם משפחה</label>
                                    <input
                                        type="text"
                                        placeholder="שם משפחה"
                                        value={order.customer.last_name}
                                        onChange={event => onChangeHandler(event, "last_name")}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <h3>כתובת</h3>
                        <div className="details-section">
                            <div className="input-couple">
                                <div className={submitValidation.city ? "info" : "info invalid"}>
                                    <label>* עיר</label>
                                    <input
                                        type="text"
                                        placeholder="עיר"
                                        value={order.city}
                                        onChange={event => onChangeHandler(event, "city")}
                                    />
                                </div>
                                <div className="seperator"></div>
                                <div className={submitValidation.street ? "info" : "info invalid"}>
                                    <label>* רחוב</label>
                                    <input
                                        type="text"
                                        placeholder="רחוב"
                                        value={order.street}
                                        onChange={event => onChangeHandler(event, "street")}
                                    />
                                </div>
                            </div>
                            <div className="seperator"></div>
                            <div className="input-couple">
                                <div className={submitValidation.number ? "info" : "info invalid"}>
                                    <label>* מספר בית</label>
                                    <input
                                        type="number"
                                        min="1" 
                                        placeholder="מספר בית"
                                        step="1"
                                        value={order.number}
                                        onChange={event => onChangeHandler(event, "number")}
                                    />
                                </div>
                                <div className="seperator"></div>
                                <div className="info">
                                    <label>מספר דירה</label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="מספר דירה"
                                        value={order.apartment}
                                        onChange={event => onChangeHandler(event, "apartment")}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3>הערות להזמנה</h3>
                        <div className="remark-section">
                            <input
                                type="text"
                                placeholder="הערות"
                                value={order.remark}
                                onChange={event => onChangeHandler(event, "remark")}
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
    }
    else if(status === "loading")
        content = (
            <div className="spinner-and-error">
                <Spinner/>
            </div>
        );
    else if(status === "error")
        content = (
            <div className="spinner-and-error">
                <p>שגיאת תקשורת, נא לנסות מאוחר יותר</p>
            </div>
        );

    return content;
}

export default CustomerInfo;