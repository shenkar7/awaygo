import React from 'react';
import './OrderInput.css';

const OrderInput = props => {

    const changeHandler = event => {
        props.set(event.target.value);
    }

    return (
        <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={changeHandler}/>
    );
};

export default OrderInput;