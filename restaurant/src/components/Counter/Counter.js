import './Counter.css';

const Counter = props => {

    return (
        <div className="counter">
            <div className="counter-button" onClick={() => props.countHandler(1)}><i className="fas fa-plus"></i></div>
            <div>{props.count}</div>
            <div className="counter-button" onClick={() => props.countHandler(-1)}><i className="fas fa-minus"></i></div>
        </div>
    );
}

export default Counter;