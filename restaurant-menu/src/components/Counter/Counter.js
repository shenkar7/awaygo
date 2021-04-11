import './Counter.css';

const Counter = props => {


    // const clickHandler = amount => {
    //     if (props.count + amount > 0)
    //         props.setCount(props.count + amount)
    // }

    return (
        <div className="counter">
            <div className="button" onClick={() => props.countHandler(1)}><i className="fas fa-plus"></i></div>
            <div>{props.count}</div>
            <div className="button" onClick={() => props.countHandler(-1)}><i className="fas fa-minus"></i></div>
        </div>
    );
}

export default Counter;