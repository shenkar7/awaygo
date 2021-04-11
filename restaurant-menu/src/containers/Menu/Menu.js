import './Menu.css';
import React, {useState/*, useContext*/} from 'react';
//import OrderContext from '../../OrderContext';
import Navigation from './Navigation/Navigation';
import DishDetails from './DishDetails/DishDetails';
import Cart from './Cart/Cart';
import Modal from '../../components/Modal/Modal';

const Menu = props => {

    
    const [dishDetailsWindow, setDishDetailsWindow] = useState(null);
    // const cartDishes = useContext(OrderContext);
    const [cartDishes, setCartDishes] = useState([]);

    console.log(cartDishes);

    const dishClickHandler = (dish) => {
        const dishWindow = <DishDetails dish={dish} setWindowModal={() => setDishDetailsWindow(null)} setCartDishes={setCartDishes}/>;
        setDishDetailsWindow(
            <Modal content={dishWindow} modalClick={() => setDishDetailsWindow(false)}/>
        );
    }

    const cartDishRemoveHandler = dishInCart => {
        const newCart = cartDishes.filter(dish => dish !== dishInCart);
        setCartDishes(newCart);
    }

    const categories = props.foodCategories.map(category => {
            const dishes = category.dishes.map(dish =>
                <div className="dish" key={dish.name} onClick={() => dishClickHandler(dish)}>
                    <h4>{dish.name}</h4>
                    <p>{dish.description}</p>
                    <p>₪{dish.price}</p>
                </div>
            );

            return (
                <div className="category" key={category.name}>
                    <h3 id={category.name}>{category.name}</h3>
                    <div className="dishes-in-category">
                        {dishes}
                    </div>
                </div>
            )
        }    
    );

    const content = (
        <div className="menu">
            <div className="nav-and-hr">
                <nav>
                    <Navigation foodCategories={props.foodCategories}/>
                </nav>
                <hr/>
            </div>
            
            <div className="categories-and-cart">
                <div className="categories">
                    {categories}
                </div>
                <Cart dishesInOrder={cartDishes} cartDishRemoveHandler={cartDishRemoveHandler} submitHandler={() => props.submitHandler(cartDishes)}/>
            </div>
            {dishDetailsWindow}
        </div>
    );

    return content;
}

export default Menu;