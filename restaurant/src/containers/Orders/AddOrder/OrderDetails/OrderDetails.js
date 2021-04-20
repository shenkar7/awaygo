import './OrderDetails.css';
import React, {useContext} from 'react';
import OrderContext from '../OrderContext';

const OrderDetails = props => {

    const customersList = useContext(OrderContext).customersList;

    const phoneSetAutoFill = (newOrder) => {
        customersList.forEach(customer => {
            if (customer.phone_number === newOrder.customer.phone_number) {
                newOrder.customer.first_name = customer.first_name;
                newOrder.customer.last_name = customer.last_name;
                
                if (customer.email)
                    newOrder.customer.email = customer.email;
                else
                    newOrder.customer.email = null;
                
                newOrder.city = customer.city;
                
                if(customer.street)
                    newOrder.street = customer.street;
                else
                    newOrder.street = null;

                if(customer.number)
                    newOrder.number = customer.number;
                else
                    newOrder.number = null;

                if(customer.apartment)
                    newOrder.apartment = customer.apartment;
                else
                    newOrder.apartment = null;
            }
        });    
    }

    const inputChangeHandler = (event, key, customer = false) => {
        if (customer){
            const newOrder = {...props.order};
            newOrder.customer = {...props.order.customer};
            newOrder.customer[key] = event.target.value;
            if (key === "phone_number")
                phoneSetAutoFill(newOrder);
            props.setOrder(newOrder);
        }
        else {
            const newOrder = {...props.order};
            newOrder[key] = event.target.value;
            props.setOrder(newOrder);
        }
    }

    return (
        <div className="order-details">
            <form>
                <h2>פרטי לקוח</h2>
                <div className="customer-details">
                    <div className="order-input">
                        <label>טלפון *</label>
                        <br/>
                        <input
                            type="text"
                            placeholder="טלפון"
                            value={props.order.customer.phone_number}
                            onChange={event => inputChangeHandler(event, "phone_number", true)}
                        />
                    </div>
                    <div className="order-input">
                        <label>אימייל</label>
                        <br/>
                        <input
                            type="email"
                            placeholder="אימייל"
                            value={props.order.customer.email}
                            onChange={event => inputChangeHandler(event, "email", true)}
                        />
                    </div>
                    <div className="order-input">
                        <label>שם פרטי *</label>
                        <br/>
                        <input
                            type="text"
                            placeholder="שם פרטי"
                            value={props.order.customer.first_name}
                            onChange={event => inputChangeHandler(event, "first_name", true)}
                        />
                    </div>
                    <div className="order-input">
                        <label>שם משפחה *</label>
                        <br/>
                        <input
                            type="text"
                            placeholder="שם משפחה"
                            value={props.order.customer.last_name}
                            onChange={event => inputChangeHandler(event, "last_name", true)}
                        />
                    </div>
                </div>

                <h2>כתובת</h2>
                <div className="address-details">
                    <div className="order-input">
                        <label>עיר *</label>
                        <br/>
                        <input
                            type="text"
                            placeholder="עיר"
                            value={props.order.city}
                            onChange={event => inputChangeHandler(event, "city")}
                        />
                    </div>
                    <div className="order-input">
                        <label>רחוב</label>
                        <br/>
                        <input
                            type="text"
                            placeholder="רחוב"
                            value={props.order.street}
                            onChange={event => inputChangeHandler(event, "street")}
                        />
                    </div>
                    <div className="order-input">
                        <label>מספר בית</label>
                        <br/>
                        <input
                            type="number"
                            placeholder="מספר בית"
                            min="1"
                            step="1"
                            value={props.order.number}
                            onChange={event => inputChangeHandler(event, "number")}
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
                            onChange={event => inputChangeHandler(event, "apartment")}
                        />
                    </div>
                </div>
                <h2>הערה</h2>
                <div className="remark">
                    <input
                        className="remark-input"
                        type="text"
                        placeholder="הערה"
                        value={props.order.remark}
                        onChange={event => inputChangeHandler(event, "remark")}
                    />
                </div>
            </form>
        </div>
    );
}

export default OrderDetails