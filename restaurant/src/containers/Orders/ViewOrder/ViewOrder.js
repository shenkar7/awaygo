import './ViewOrder.css';
import React from 'react';

const ViewOrder = props => {

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
        </div>
    );

    return content;
}

export default ViewOrder;