import './OrderSmallWindow.css';
import React from 'react';

const OrderSmallWindow = props => {

    return (
        <div className="order-small-window">
            <div className="order-number"><b>#{props.order.id}</b></div>
            <div className="inside-window" onClick={props.click}>
                <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                <div className="address">{props.order.city + " " + props.order.street + " " + props.order.number}</div>
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
};

export default OrderSmallWindow;