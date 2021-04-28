import './Menu.css';
import React, {useState} from 'react';
import Navigation from './Navigation/Navigation';
import DishDetails from './DishDetails/DishDetails';
import Cart from './Cart/Cart';
import Modal from '../../components/Modal/Modal';

const Menu = props => {

    const [dishDetailsWindow, setDishDetailsWindow] = useState(null);

    const categories = props.foodCategories.map(category => {
            const dishes = category.dishes.map(dish => {
                if (dish.visible){
                    return (
                        <div className="dish" key={dish.name} onClick={() => dishClickHandler(dish)}>
                            <div>
                                <h4>{dish.name}</h4>
                                <p>{dish.description}</p>
                                <p class="price">₪{dish.price}</p>
                            </div>
                            {dish.img ?
                                <div className="dish-image">
                                    <img alt="dish" src={"http://127.0.0.1:8000" + dish.img}/>
                                </div>
                            : null}
                        </div>
                    );
                }
                else
                    return null
            });

            return (
                <div className="category" key={category.name}>
                    <h3 id={category.name}>{category.name}</h3>
                    <div className="dishes-in-category">
                        {dishes}
                    </div>
                </div>
            );
        }    
    );

    const dishClickHandler = (dish) => {
        const dishWindow = <DishDetails dish={dish} setWindowModal={() => setDishDetailsWindow(null)}/>;
        setDishDetailsWindow(
            <Modal content={dishWindow} modalClick={() => setDishDetailsWindow(false)}/>
        );
    }

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
                <Cart submitHandler={props.submitHandler}/>
            </div>
            {dishDetailsWindow}
        </div>
    );

    return content;
}

export default Menu;