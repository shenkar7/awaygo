import React from 'react';
import './AddOrder.css';

const AddOrder = () => {

    const content = (
        <div>
            <div className="add-order-window">
                <div className="costumer-details">
                    <h2>פרטי לקוח</h2>
                    <div>
                        <input type="text" placeholder="טלפון"/>
                        <input type="email" placeholder="מייל" />
                    </div>
                    <div>
                        <input type="text" placeholder="שם משפחה"/>
                        <input type="text" placeholder="שם פרטי" />
                    </div>
                    <h3>כתובת</h3>
                    <div>
                        <input type="text" placeholder="מספר בית"/>
                        <input type="text" placeholder="רחוב" />
                        <input type="text" placeholder="עיר" />
                    </div>
                    <div>
                        <input type="text" placeholder="מספר דירה" />
                        <input type="text" placeholder="קומה" />
                    </div>
                    <h3>הערות</h3>
                    <div className="remark">
                        <input type="text" placeholder="הערות" />
                    </div>
                </div>
                <div className="menu">
                    <h2>הזמנה</h2>
                </div>
            </div>
            <div className="make-order">
                <h1>הכנס הזמנה</h1>
            </div>
        </div>
    );

    return content;
}

export default AddOrder;