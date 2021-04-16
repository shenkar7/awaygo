import './OrderSmallWindow.css';
import React from 'react';

const OrderSmallWindow = props => {

    return (
        <div className="order-small-window" onClick={props.click}>
            <div className="order-number"><b>#{props.order.id}</b></div>
            <div className="order-details">
                <div className="name">{props.order.customer.first_name + " " + props.order.customer.last_name}</div>
                <div className="address">{props.order.city}</div>
                {props.order.remark ?
                    <React.Fragment>
                        <hr/>
                        <div className="remark-section">
                            <i className="fas fa-exclamation-triangle"></i>
                            <div>
                                <p className="remark">{props.remark}</p>
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