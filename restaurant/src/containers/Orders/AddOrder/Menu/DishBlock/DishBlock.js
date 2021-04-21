import './DishBlock.css';
import React, {useState} from 'react';
import Counter from '../../../../../components/Counter/Counter';

const DishBlock = props => {

    const [open, setOpen] = useState(false);

    const initialForm = {
        dish: props.dish,
        remark: "",
        quantity: 1,
        extras: []
    };

    props.dish.extraCategories.forEach(category => {
        if (category.type === "radio")
            initialForm.extras.push(category.extras[0]);
    });

    const [formValues, setFormValues] = useState(initialForm);

    const onClickHandler = () => {
        if(open)
            setOpen(false);
        else
            setOpen(true);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        props.setOrder(prevState => {
            const newState = {...prevState};
            newState.dishes_in_order.push(formValues);
            return(newState);
        });
        setOpen(false);
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
                    <label htmlFor={extra.name}>{extra.name} {extra.price > 0 ? " (" + extra.price + "₪)" : null}</label>
                    <input
                        type="checkbox"
                        id={extra.name}
                        checked={formValues.extras.includes(extra)}
                        onChange={event => onChangeHandler(event, extra, category)}
                    />
                </div>
            );
        }
        else if (category.type === "radio") {
            extras = category.extras.map(extra => 
                <div key={extra.name} className="extra-input">
                    <label htmlFor={extra.name}>{extra.name} {extra.price > 0 ? " (" + extra.price + "₪)" : null}</label>
                    <input
                        type="radio"
                        id={extra.name}
                        checked={formValues.extras.includes(extra)}
                        onChange={event => onChangeHandler(event, extra, category)}
                    />
                </div>
            );
        }

        return (
            <div key={category.name} >
                <h4>{category.name}</h4>
                <div className="category-inputs">{extras}</div>
            </div>
        );
    });

    let content = null;

    if (!open) {
        content = (
            <div className="dish-name" onClick={onClickHandler}>
                <span>{props.dish.name}</span>
                <span>{props.dish.price}₪</span>
            </div>
        );
    }
    else {
        content = (
            <React.Fragment>
                <div className="dish-name" onClick={onClickHandler}>
                    <span>{props.dish.name}</span>
                    <span>{props.dish.price}₪</span>
                </div>
                <div className="dish-extras">
                    <div className="description-and-counter">
                        {props.dish.description}
                        <Counter count={formValues.quantity} countHandler={counterChangeHandler}/>
                    </div>
                    <form onSubmit={formSubmitHandler}>
                        {extraCategories}
                        <h4>הערה למנה</h4>
                        <div className="dish-description">
                            <input type="text" onChange={event => onRemarkChangeHandler(event.target.value)}/>
                        </div>
                        <br/>
                        <div className="add-dish-button">
                            <button type="submit">הוסף להזמנה</button>
                        </div>
                    </form>
                    <hr/>
                </div>
            </React.Fragment>
        );
    }

    return content;
}

export default DishBlock;