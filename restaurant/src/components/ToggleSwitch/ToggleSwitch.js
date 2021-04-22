import './ToggleSwitch.css';

const ToggleSwitch = props => {

    return (
        <div class="switch">
            <input type="checkbox"/>
            <span class="slider"></span>
        </div>
    );
}

export default ToggleSwitch;