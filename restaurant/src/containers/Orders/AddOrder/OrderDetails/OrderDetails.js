import './OrderDetails.css';
import React, {useContext} from 'react';
import OrdersPageContext from '../OrdersPageContext';

const OrderDetails = props => {

    const customersList = useContext(OrdersPageContext).customersList;

    const phoneSetAutoFill = (newOrder, newValidation, newValidFields) => {
        customersList.forEach(customer => {
            if (customer.phone_number === newOrder.customer.phone_number) {
                newOrder.customer.first_name = customer.first_name;
                newOrder.customer.last_name = customer.last_name;
                
                if (customer.email)
                    newOrder.customer.email = customer.email;
                else
                    newOrder.customer.email = null;
                
                newOrder.city = customer.city;
                newOrder.street = customer.street;
                newOrder.number = customer.number;
                
                if(customer.apartment)
                    newOrder.apartment = customer.apartment;
                else
                    newOrder.apartment = null;

                // customer exists, so all fields are valid
                newValidation.first_name = true;
                newValidation.last_name = true;
                newValidation.email = true;
                newValidation.city = true;
                newValidation.street = true;
                newValidation.number = true;
                newValidation.apartment = true;

                newValidFields.phone_number = true;
                newValidFields.first_name = true;
                newValidFields.last_name = true;
                newValidFields.email = true;
                newValidFields.city = true;
                newValidFields.street = true;
                newValidFields.number = true;
                newValidFields.apartment = true;

                props.setInvalid(false);
            }
        });
        
    }

    const onChangeHandler = (event, fieldName) => {

        const newOrder = {...props.order};
        newOrder.customer = {...props.order.customer};
        const newValidation = {...props.validation};
        const newValidFields = {...props.validFields}

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
            phoneSetAutoFill(newOrder, newValidation, newValidFields);
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

        props.setOrder(newOrder);
        props.setValidation(newValidation);
        props.setValidFields(newValidFields);
    }

    return (
        <div className="order-details">
            <form>
                <h2>פרטי לקוח</h2>
                <div className="customer-details">
                    <div className="input-couple">
                        <div className={props.validFields.phone_number ? "order-input" : "order-input invalid"}>
                            <label>טלפון *</label>
                            <br/>
                            <input
                                type="text"
                                placeholder="טלפון"
                                value={props.order.customer.phone_number}
                                onChange={event => onChangeHandler(event, "phone_number")}
                            />
                        </div>
                        <div className="order-input">
                            <label>אימייל</label>
                            <br/>
                            <input
                                type="email"
                                placeholder="אימייל"
                                value={props.order.customer.email}
                                onChange={event => onChangeHandler(event, "email")}
                            />
                        </div>
                    </div>
                    <div className="input-couple">
                        <div className={props.validFields.first_name ? "order-input" : "order-input invalid"}>
                            <label>שם פרטי *</label>
                            <br/>
                            <input
                                type="text"
                                placeholder="שם פרטי"
                                value={props.order.customer.first_name}
                                onChange={event => onChangeHandler(event, "first_name")}
                            />
                        </div>
                        <div className={props.validFields.last_name ? "order-input" : "order-input invalid"}>
                            <label>שם משפחה *</label>
                            <br/>
                            <input
                                type="text"
                                placeholder="שם משפחה"
                                value={props.order.customer.last_name}
                                onChange={event => onChangeHandler(event, "last_name")}
                            />
                        </div>
                    </div>
                </div>

                <h2>כתובת</h2>
                <div className="address-details">
                    <div className="input-couple">
                        <div className={props.validFields.city ? "order-input" : "order-input invalid"}>
                            <label>עיר *</label>
                            <br/>
                            <input
                                type="text"
                                placeholder="עיר"
                                value={props.order.city}
                                onChange={event => onChangeHandler(event, "city")}
                            />
                        </div>
                        <div className={props.validFields.street ? "order-input" : "order-input invalid"}>
                            <label>רחוב *</label>
                            <br/>
                            <input
                                type="text"
                                placeholder="רחוב"
                                value={props.order.street}
                                onChange={event => onChangeHandler(event, "street")}
                            />
                        </div>
                    </div>
                    <div className="input-couple">
                        <div className={props.validFields.number ? "order-input" : "order-input invalid"}>
                            <label>מספר בית *</label>
                            <br/>
                            <input
                                type="number"
                                placeholder="מספר בית"
                                min="1"
                                step="1"
                                value={props.order.number}
                                onChange={event => onChangeHandler(event, "number")}
                            />
                        </div>
                        <div className="order-input">
                            <label>מספר דירה</label>
                            <br/>
                            <input
                                type="number"
                                placeholder="מספר דירה"
                                min="1"
                                step="1"
                                value={props.order.apartment}
                                onChange={event => onChangeHandler(event, "apartment")}
                            />
                        </div>
                    </div>
                </div>
                <h2>הערה</h2>
                <div className="remark">
                    <input
                        className="remark-input"
                        type="text"
                        placeholder="הערה"
                        value={props.order.remark}
                        onChange={event => onChangeHandler(event, "remark")}
                    />
                </div>
            </form>
        </div>
    );
}

export default OrderDetails