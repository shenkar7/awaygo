import './SearchDisplay.css';
import addImg from '../../../assets/img/add.png'
import addHoverImg from '../../../assets/img/addHover.png'
import React, {useState} from 'react';

const SearchDisplay = props => {
    
    const [addHover, setAddHover] = useState(false);

    return (
        <div className="search-display-row"> 
            <div>
                <form className="search">
                    <input type="text"/>
                    <button type="submit">GO</button>
                </form>
            </div>
            <div className="left-section">
                <div className="display-window">
                    <i className="fas fa-grip-lines display-icon"></i>
                    <i className="fas fa-th display-icon"></i>
                </div>
                <span className="addImgSpan">
                    {addHover
                        ? <img src={addHoverImg} alt="hoverAdd" onMouseOut={() => setAddHover(false)} onClick={props.addOrderHandler} />
                        : <img src={addImg} alt="add" onMouseOver={() => setAddHover(true)} />
                    }
                </span>
            </div>
        </div>
    );
}

export default SearchDisplay;