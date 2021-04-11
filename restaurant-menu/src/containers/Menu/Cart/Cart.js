import './Cart.css';
import React from 'react';
import DishInCart from './DishInCart/DishInCart';

const Cart = props => {

    let price = 0;

    const addToPrice = dishInOrder => {
        let addedPrice = parseFloat(dishInOrder.dish.price);
        dishInOrder.extras.forEach(extra => {
            addedPrice += parseFloat(extra.price);
        });
        price += addedPrice * dishInOrder.quantity;
    };

    const dishesInOrder = props.dishesInOrder.map(dishInOrder => {
        addToPrice(dishInOrder);
        return <DishInCart key={dishInOrder} dishInCart={dishInOrder} cartDishRemoveHandler={props.cartDishRemoveHandler}/>
    });

    return (
        <aside className="cart">
            <h3>עגלת הזמנה</h3>
            <div className="dishes-in-order">
               {dishesInOrder} 
            </div>
            {price > 0 ?
            <React.Fragment>
                <div className="total-price">
                    <h4>{`סה"כ ₪` + price}</h4>
                </div>
                <button className="submit-order" onClick={props.submitHandler}>בצע הזמנה</button>
            </React.Fragment>
            : <p>העגלה ריקה</p>
            }
            
        </aside>
    );
}

export default Cart;