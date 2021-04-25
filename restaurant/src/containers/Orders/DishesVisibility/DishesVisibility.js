import React, {useState, useEffect} from 'react';
import './DishesVisibility.css';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';
import {getCookie} from '../../../assets/functions';

const DishesVisibility = props => {

    const [status, setStatus] = useState(null);

    const createNewFoodCategories = oldFoodCategories => {
        const newFoodCategories = [...oldFoodCategories];
        for (let i = 0; i < oldFoodCategories.length; i++) {
            newFoodCategories[i] = {...oldFoodCategories[i]}
            newFoodCategories[i].dishes = [...oldFoodCategories[i].dishes]
            for(let j = 0; j < oldFoodCategories[i].dishes.length; j++) {
                newFoodCategories[i].dishes[j] = {...oldFoodCategories[i].dishes[j]}
            }
        }
        return newFoodCategories;
    }

    const [foodCategories, setFoodCategories] = useState(createNewFoodCategories(props.foodCategories));

    const onChangeHandler = (event, id) => {
        const newFoodCategories = createNewFoodCategories(foodCategories);
        newFoodCategories.forEach(category => {
            category.dishes.forEach(dish => {
                if (dish.id === id)
                    dish.visible = event.target.checked;
            })
        })
        setFoodCategories(newFoodCategories);
    }

    const onSubmitHandler = () => {
        setStatus("loading");

        const csrftoken = getCookie('csrftoken');

        axios.put("http://127.0.0.1:8000/dishes_visibility",
            foodCategories,
            {
                headers: {'X-CSRFTOKEN': csrftoken,},
            },
        )
        .then(res => {
            console.log("SUCCESS updating dishes visibility");
            props.setFoodCategories(foodCategories);
            setStatus(null);
            props.modalClose(false);
        })
        .catch(err => {
            setStatus("error");
            console.log("Error updating dishes visibility");
            console.log(err.message);
        });
    }

    let content = null;
    if (status === "loading") {
        content = (
            <div className="spinner-and-error">
                <Spinner/>
            </div>
        );
    }
    else if (status === "error"){
        content = (
            <div className="spinner-and-error">
                שגיאת תקשורת
            </div>
        );
    }
    else {
        const foodCategoriesContent = foodCategories.map(category => {
            const dishes = category.dishes.map(dish => 
                <div className="dish-input" key={dish.name}>
                    <input type="checkbox" id={dish.name} checked={dish.visible} onChange={event => onChangeHandler(event, dish.id)}/>
                    <label htmlFor={dish.name}>{dish.name}</label>
                </div>
            );

            return (
                <React.Fragment key={category.name}>
                    <h3>{category.name}</h3>
                    {dishes}
                </React.Fragment>
            ); 
        });

        content = (
            <React.Fragment>
                {foodCategoriesContent}
                <div className="update-button" onClick={onSubmitHandler}>עדכן</div>
            </React.Fragment>
        );
        
    }

    return (
        <div className="dishes-visibility">
            <h2>סימון מנות שיופיעו בתפריט</h2>
            {content}
        </div>
    );
}

export default DishesVisibility;