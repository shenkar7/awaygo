import './Cart.css';
import DishInCart from './DishInCart/DishInCart';

const Cart = props => {

    let totalPrice = 0;

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
            {totalPrice > 0 ?
            <div className="total-price">
                <h4>{`סה"כ ₪` + totalPrice}</h4>
            </div>
            : <p>העגלה ריקה</p>
            }
        </aside>
    );
}

export default Cart;