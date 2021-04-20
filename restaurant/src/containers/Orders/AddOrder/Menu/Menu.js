import './Menu.css';
import React, {useContext} from 'react';
import OrderContext from '../OrderContext';
import DishBlock from './DishBlock/DishBlock';

const Menu = () => {

    const foodCategories = useContext(OrderContext).foodCategories;

    const categories = foodCategories.map(category => {
        const dishes = category.dishes.map(dish => 
            <div key={dish.name}>
                <DishBlock dish={dish}/>
            </div>
        )

        return (
            <div key={category.name}>
                <h3>{category.name}</h3>
                {dishes}
            </div>
        );
    });

    return (
        <div className="menu">
            <h2>תפריט</h2>
            {categories}
        </div>
    )
}

export default Menu;