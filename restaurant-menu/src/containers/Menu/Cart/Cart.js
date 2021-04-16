import './Cart.css';
import React, {useContext} from 'react';
import OrderContext from '../../../OrderContext';
import DishInCart from './DishInCart/DishInCart';

const Cart = props => {

    const order = useContext(OrderContext)[0];

    let totalPrice = 0;

    const addToPrice = dishInOrder => {
        let addedPrice = parseFloat(dishInOrder.dish.price);
        dishInOrder.extras.forEach(extra => {
            addedPrice += parseFloat(extra.price);
        });
        totalPrice += addedPrice * dishInOrder.quantity;
    };

    const dishesInOrder = order.dishes_in_order.map(dishInOrder => {
        addToPrice(dishInOrder);
        return <DishInCart key={Math.random()} dishInCart={dishInOrder}/>
    });

    return (
        <aside className="cart">
            <h3>עגלת הזמנה</h3>
            <div className="dishes-in-order">
               {dishesInOrder} 
            </div>
            {totalPrice > 0 ?
            <React.Fragment>
                <div className="total-price">
                    <h4>{`סה"כ ₪` + totalPrice}</h4>
                </div>
                <button className="submit-order" onClick={props.submitHandler}>בצע הזמנה</button>
            </React.Fragment>
            : <p>העגלה ריקה</p>
            }
            
        </aside>
    );
}

export default Cart;