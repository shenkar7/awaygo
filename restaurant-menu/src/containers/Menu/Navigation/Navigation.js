import './Navigation.css';
import React, {useState} from 'react';
import MenuButton from './MenuButton/MenuButton';

const Navigation = props => {

    const [selectedCategory, setSelectedCategory] = useState(props.foodCategories[0].name);

    const categoryClickHandler = (categoryName) => {
        setSelectedCategory(categoryName);
    }

    let content = props.foodCategories.map(category => {
        if (category.name === selectedCategory)
            return <MenuButton key={category.name} categoryName={category.name} bold={true} clickHandler={categoryClickHandler}/>
        else
            return <MenuButton key={category.name} categoryName={category.name} clickHandler={categoryClickHandler}/>
        
    });

    return <div className="navigation">{content}</div>;
}

export default Navigation;