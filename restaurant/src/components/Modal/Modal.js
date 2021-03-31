import './Modal.css';

const Modal = props => {

    const content = (
        <div className="modal">
            <div className="modal-background" onClick={props.modalClick}></div>
            <div className="modal-content">{props.content}</div>
        </div>
    );

    return content;
}

export default Modal;