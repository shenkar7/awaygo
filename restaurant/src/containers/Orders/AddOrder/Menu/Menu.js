import './Menu.css';
import React, {useContext} from 'react';
import OrdersPageContext from '../OrdersPageContext';
import DishBlock from './DishBlock/DishBlock';

const Menu = props => {

    const foodCategories = useContext(OrdersPageContext).foodCategories;

    const categories = foodCategories.map(category => {
        const dishes = category.dishes.map(dish => {
            if (dish.visible){
                return (
                    <div key={dish.name}>
                        <DishBlock dish={dish} setOrder={props.setOrder}/>
                    </div>
                );
            }
            else    
                return null;
        });

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