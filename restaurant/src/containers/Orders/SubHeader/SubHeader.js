import './SubHeader.css';
import addImg from '../../../assets/img/add.png'
import addHoverImg from '../../../assets/img/addHover.png'
import React, {useState} from 'react';

const SubHeader = props => {
    
    const [addHover, setAddHover] = useState(false);

    return (
        <div className="sub-header"> 
            <div className="add-order-button">
                {addHover
                    ? <img src={addHoverImg} alt="hoverAdd" onMouseOut={() => setAddHover(false)} onClick={props.addOrderHandler} />
                    : <img src={addImg} alt="add" onMouseOver={() => setAddHover(true)} />
                }
            </div>
            <div className="navigation">
                <span className="navigation-button" onClick={props.historyHandler}>
                    <i class="fas fa-history"></i>
                    היסטורית הזמנות (בבנייה)
                </span>
                <span className="separator">|</span>
                <span className="navigation-button" onClick={props.menuSiteClosureHandler}>
                    <i class="fas fa-store-slash"></i>
                    השבתת אתר התפריט
                </span>
                <span className="separator">|</span>
                <span className="navigation-button" onClick={props.dishesVisibilityHandler}>
                    <i class="fas fa-eye-slash"></i>
                    הסתרת/הצגת מנות
                </span>
            </div>
        </div>
    );
}

export default SubHeader;