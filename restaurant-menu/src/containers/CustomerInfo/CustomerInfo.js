import './CustomerInfo.css';
import React, {useState} from 'react';

const CustomerInfo = props => {

    const [form, setForm] = useState({
        phone_number: "",
        email: "",
        first_name: "",
        last_name: "",
        address: 
            {
                city: "",
                street: "",
                number: "",
                apartment: ""
            },
        remark: ""
    });

    const submitHandler = event => {
        event.preventDefault();
    }

    const content = (
        <React.Fragment>
            <div className="back">
                <a onClick>חזור לתפריט</a>
            </div>
            <div className="form-window">
                <form onSubmit={submitHandler}>

                    <h3>פרטי המזמין</h3>
                    <div className="details-section">
                        <div className="info">
                            <label>* טלפון</label>
                            <input type="tel" placeholder="טלפון" value={form.phone_number}/>
                        </div>
                        <div className="info">
                            <label>אימייל</label>
                            <input type="email" placeholder="אימייל" value={form.email}/>
                        </div>
                        <div className="info">
                            <label>* שם פרטי</label>
                            <input type="text" placeholder="שם פרטי" value={form.first_name}/>
                        </div>
                        <div className="info">
                            <label>* שם משפחה</label>
                            <input type="text" placeholder="שם משפחה" value={form.last_name}/>
                        </div>
                    </div>
                    
                    <h3>כתובת</h3>
                    <div className="details-section">
                        <div className="info">
                            <label>* עיר</label>
                            <input type="text" placeholder="עיר" value={form.address.city}/>
                        </div>
                        <div className="info">
                            <label>רחוב</label>
                            <input type="text" placeholder="רחוב" value={form.address.street}/>
                        </div>
                        <div className="info">
                            <label>מספר בית</label>
                            <input type="number" min="1" placeholder="מספר בית" step="1" value={form.address.number}/>
                        </div>
                        <div className="info">
                            <label>מספר דירה</label>
                            <input type="number" min="1" placeholder="מספר דירה" value={form.address.apartment}/>
                        </div>
                    </div>

                    <h3>הערות להזמנה</h3>
                    <div className="remark-section">
                        <input type="text" placeholder="הערות" value={form.remark}/>
                    </div>
                    <div className="submit-section">
                        <button type="submit">בצע הזמנה</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );

    return content;
}

export default CustomerInfo;