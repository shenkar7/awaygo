import './ToggleSwitch.css';

const ToggleSwitch = props => {

    return (
        <label className="switch">
            <input type="checkbox" checked={props.checked} onChange={props.toggleHandler}/>
            <span className="slider"></span>
        </label>
    );
}

export default ToggleSwitch;

//  