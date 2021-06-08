import './Cart.css';
import React, {useContext} from 'react';
import OrdersPageContext from '../OrdersPageContext';
import DishInCart from './DishInCart/DishInCart';

const Cart = props => {

    const delivery_cost = useContext(OrdersPageContext).delivery_cost;

    let totalPrice = delivery_cost;

    const addToPrice = dishInOrder => {
        let addedPrice = parseFloat(dishInOrder.dish.price);
        dishInOrder.extras.forEach(extra => {
            addedPrice += parseFloat(extra.price);
        });
        totalPrice += addedPrice * dishInOrder.quantity;
    };

    const dishesInOrder = props.order.dishes_in_order.map(dishInOrder => {
        addToPrice(dishInOrder);
        return <DishInCart key={Math.random()} dishInCart={dishInOrder} order={props.order} setOrder={props.setOrder}/>
    });

    return (
        <aside className="cart-window">
            <h3>עגלת הזמנה</h3>
            <div className="dishes-in-order">
               {dishesInOrder} 
            </div>
            {totalPrice > delivery_cost ?
            <div className="total-price">
                <h4>{`סה"כ + משלוח ₪` + totalPrice}</h4>
            </div>
            : <p>העגלה ריקה</p>
            }
        </aside>
    );
}

export default Cart;