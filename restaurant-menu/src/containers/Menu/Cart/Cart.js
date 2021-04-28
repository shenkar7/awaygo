import './Cart.css';
import React, {useState, useContext} from 'react';
import OrderContext from '../../../OrderContext';
import DishInCart from './DishInCart/DishInCart';
import { useMediaQuery } from 'react-responsive'

const Cart = props => {

    const order = useContext(OrderContext)[0];
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

    let initialWindowOpen = true;
    if (isMobile)
        initialWindowOpen = false;

    const [windowOpen, setWindowOpen] = useState(initialWindowOpen);

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

    let dishesInOrderContent = (
        <React.Fragment>
            <div className="dishes-in-order">
                {dishesInOrder} 
            </div>
            {totalPrice > 0 ?
            <React.Fragment>
                <div className="total-price">
                    <h4>{`סה"כ ₪` + totalPrice}</h4>
                </div>
                <div className="submit-order" onClick={props.submitHandler}>בצע הזמנה</div>
            </React.Fragment>
            : <p>העגלה ריקה</p>
            }
        </React.Fragment>
    );

    if (!windowOpen && isMobile)
        dishesInOrderContent = null;

    return (
        <aside className="cart">
            <div className="title">
                <h3>עגלת הזמנה</h3>
                {windowOpen ?
                    <i class="fas fa-minus" onClick={() => setWindowOpen(false)}></i>
                :
                    <i class="fas fa-plus" onClick={() => setWindowOpen(true)}></i>
                }
            </div>
            {dishesInOrderContent}
        </aside>
    );
}

export default Cart;