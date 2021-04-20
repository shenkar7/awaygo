import './DishBlock.css';
import React, {useState} from 'react';

const DishBlock = props => {

    const [open, setOpen] = useState(false);

    const onClickHandler = () => {
        if(open)
            setOpen(false);
        else
            setOpen(true);
    }

    let content = null;

    if (!open) {
        content = (
            <div className="dish-name" onClick={onClickHandler}>
                {props.dish.name}
            </div>
        );
    }
    else {
        content = (
            <React.Fragment>
                <div className="dish-name" onClick={onClickHandler}>
                    {props.dish.name}
                </div>
                <div className="dish-extras">
                    some extras of the dish
                </div>
            </React.Fragment>
        );
    }

    return content;
}

export default DishBlock;