import React, {useState} from 'react';
import './AddOrder.css';
import OrderInput from './OrderInput/OrderInput';

const AddOrder = props => {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [floor, setFloor] = useState('');
    const [apartment, setApartment] = useState('');

    

    let phoneSetAUtoFill = () => {};

    phoneSetAUtoFill = (phoneValue) => {
        setPhone(phoneValue);
        props.customers.forEach(customer => {
            if(customer.phone_number == phoneValue) {
                if(customer.email)
                    setEmail(customer.email);
                else
                    setEmail('');
                if(customer.first_name)
                    setFirstName(customer.first_name);
                else
                    setFirstName('');
                if(customer.last_name)
                    setLastName(customer.last_name);
                else
                    setLastName('');
                if(customer.address.city)
                    setCity(customer.address.city);
                else
                    setCity('');
                if(customer.address.street)
                    setStreet(customer.address.street);
                else
                    setStreet('');
                if(customer.address.number)
                    setNumber(customer.address.number);
                else
                    setNumber('');
                if(customer.address.floor)
                    setFloor(customer.address.floor);
                else
                    setFloor('');
                if(customer.address.apartment)
                    setApartment(customer.address.apartment);
                else
                    setApartment('');
            }
        });    
    }
    
    const content = (
        <div>
            <div className="add-order-window">
                <div className="costumer-details">
                    <h2>פרטי לקוח</h2>
                    <div>
                        <OrderInput type="email" placeholder="אימייל" value={email} set={setEmail}/>
                        <OrderInput type="text" placeholder="טלפון" value={phone} set={phoneSetAUtoFill}/>
                    </div>
                    <div>
                        <OrderInput type="text" placeholder="שם משפחה" value={lastName} set={setLastName}/>
                        <OrderInput type="text" placeholder="שם פרטי" value={firstName} set={setFirstName}/>
                    </div>
                    <h3>כתובת</h3>
                    <div>
                        <OrderInput type="number" placeholder="מספר בית" value={number} set={setNumber}/>
                        <OrderInput type="text" placeholder="רחוב" value={street} set={setStreet}/>
                        <OrderInput type="text" placeholder="עיר" value={city} set={setCity}/>
                    </div>
                    <div>
                        <OrderInput type="number" placeholder="מספר דירה" value={apartment} set={setApartment}/>
                        <OrderInput type="number" placeholder="קומה" value={floor} set={setFloor}/>
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