import './DishInCart.css';
import React, {useContext} from 'react';
import OrderContext from '../../../../OrderContext';

const DishInCart = props => {

    const [order, setOrder] = useContext(OrderContext);

    let price = parseFloat(props.dishInCart.dish.price); 
    let extrasList = "";

    for(let i = 0; i < props.dishInCart.extras.length; i++) {
        price += parseFloat(props.dishInCart.extras[i].price);
        
        if (i < props.dishInCart.extras.length - 1)
            extrasList += props.dishInCart.extras[i].name + ", ";
        else
            extrasList += props.dishInCart.extras[i].name;
    }

    const cartDishRemoveHandler = () => {
        const newOrder = {...order};
        newOrder.dishes_in_order = newOrder.dishes_in_order.filter(dish => dish !== props.dishInCart);
        setOrder(newOrder);
    }

    const content = (
        <div>
            <div className="name-and-price">
                <h4>{props.dishInCart.quantity + " × " + props.dishInCart.dish.name}</h4>
                <p>₪{price * parseFloat(props.dishInCart.quantity)}</p>
            </div>
            {extrasList}
            <div className="delete">
                <i className="fas fa-trash-alt" onClick={cartDishRemoveHandler}></i>
            </div>
            <hr/>
        </div>
    );

    return content;
}

export default DishInCart;