import React from 'react';

let id;
const params = new URLSearchParams(document.location.search.substring(1));
id = params.get('id');

const OrderContext = React.createContext({
    restaurant_id: id,
    customer: {
        phone_number: "",
        first_name: "",
        last_name: "",
        email: ""
    },
    address: {
        city: "",
        street: "",
        number: "",
        apartment: ""
    },
    remark: "",
    dishes_in_order: []
});

export default OrderContext;