import './Cart.css';
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
        return <DishInCart key={dishInOrder} dishInCart={dishInOrder}/>
    });

    return (
        <aside className="cart">
            <h3>עגלת הזמנה</h3>
            {dishesInOrder}
            <h4>{`סה"כ ₪` + price}</h4>
        </aside>
    );
}

export default Cart;