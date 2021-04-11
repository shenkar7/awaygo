import './DishDetails.css';
import React, {useState} from 'react';
import Counter from '../../../components/Counter/Counter';

const DishDetails = props => {

    const initialForm = {dish: props.dish, remark: "", quantity: 1, extras: []};
    props.dish.extraCategories.forEach(category => {
        if (category.type === "radio")
            initialForm.extras.push(category.extras[0]);
    });

    const [formValues, setFormValues] = useState(initialForm);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        props.setCartDishes(prevState => {
            const newState = [...prevState];
            newState.push(formValues);
            return(newState);
        });
        props.setWindowModal();
    }

    const counterChangeHandler = (value) => {
        if (formValues.quantity + value > 0) {
            const newForm = {...formValues};
            newForm.quantity = formValues.quantity + value;
            setFormValues(newForm);
        }
    }

    const onChangeHandler = (event, extra, category) => {
        const newFormState = {...formValues};
        if (category.type === "checkbox"){
            if(event.target.checked)
                newFormState.extras.push(extra);
            else
                newFormState.extras = newFormState.extras.filter(value => value !== extra);
        }
        else if (category.type === "radio") {
            newFormState.extras = newFormState.extras.filter(extra => !category.extras.includes(extra));
            newFormState.extras.push(extra);
        }
            
        setFormValues(newFormState);
    }

    const onRemarkChangeHandler = (value) => {
        const newFormState = {...formValues};
        newFormState.remark = value;
        setFormValues(newFormState);
    }

    const extraCategories = props.dish.extraCategories.map(category => {

        let extras;
        
        if (category.type === "checkbox"){
            extras = category.extras.map(extra => 
                <div key={extra.name} className="extra-input">
                    <input
                        type="checkbox"
                        id={extra.name}
                        checked={formValues.extras.includes(extra)}
                        onChange={event => onChangeHandler(event, extra, category)}
                    />
                    <label htmlFor={extra.name}>{extra.name} {extra.price > 0 ? " (" + extra.price + "₪)" : null}</label>
                </div>
            );
        }
        else if (category.type === "radio") {
            extras = category.extras.map(extra => 
                <div key={extra.name} className="extra-input">
                    <input
                        type="radio"
                        id={extra.name}
                        checked={formValues.extras.includes(extra)}
                        onChange={event => onChangeHandler(event, extra, category)}
                    />
                    <label htmlFor={extra.name}>{extra.name} {extra.price > 0 ? " (" + extra.price + "₪)" : null}</label>
                </div>
            );
        }

        return (
            <div key={category.name} >
                <h4>{category.name}</h4>
                <div className="category-inputs">{extras}</div>
                <hr/>
            </div>
        );
    });

    const content = (
        <div className="dish-details">
            <h3>{props.dish.name}</h3>
            <p>{props.dish.description}</p>
            <div className="price-and-counter">
                {props.dish.price}₪
                <Counter count={formValues.quantity} countHandler={counterChangeHandler}/>
            </div>
            <hr/>
            <form onSubmit={formSubmitHandler}>
                {extraCategories}
                <h4>הערה למנה</h4>
                <input type="text" onChange={event => onRemarkChangeHandler(event.target.value)}/>
                <button className="add-dish-button" type="submit">הוסף להזמנה</button>
            </form>
        </div>
    );

    return content;
}

export default DishDetails;