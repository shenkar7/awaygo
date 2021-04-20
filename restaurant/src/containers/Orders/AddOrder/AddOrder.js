import React, {useState} from 'react';
import './AddOrder.css';
import OrderDetails from './OrderDetails/OrderDetails';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';


const AddOrder = props => {

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
    
    const content = (
        <div>
            <div className="add-order-window">
                <div className="customer-and-menu">
                    <OrderDetails order={order} setOrder={setOrder}/>
                    <Menu />
                </div>
                <div className="cart">
                    <Cart/>
                </div>
            </div>
            <TimingOrder/>
        </div>
    );

    return content;
}

export default AddOrder;