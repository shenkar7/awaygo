import './MenuButton.css';

const MenuButton = props => {

    let content;
    if (props.bold)
        content = <a className="button-text selected" href={"#"+props.categoryName}>{props.categoryName}</a>
    else
        content = <a className="button-text with-hover" href={"#"+props.categoryName}>{props.categoryName}</a>

    return (
        <div className="menu-button" onClick={() => props.clickHandler(props.categoryName)}>
            {content}
        </div>
    );
}

export default MenuButton;