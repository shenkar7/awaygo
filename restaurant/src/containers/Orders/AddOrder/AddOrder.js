import React, {useState} from 'react';
import './AddOrder.css';
import OrderInput from './OrderInput/OrderInput';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';

const AddOrder = props => {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [apartment, setApartment] = useState('');

    

    let phoneSetAUtoFill = () => {};

    phoneSetAUtoFill = (phoneValue) => {
        setPhone(phoneValue);
        props.customers.forEach(customer => {
            if(customer.phone_number === phoneValue) {
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
                if(customer.city)
                    setCity(customer.city);
                else
                    setCity('');
                if(customer.street)
                    setStreet(customer.street);
                else
                    setStreet('');
                if(customer.number)
                    setNumber(customer.number);
                else
                    setNumber('');
                if(customer.apartment)
                    setApartment(customer.apartment);
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
            <TimingOrder/>
        </div>
    );

    return content;
}

export default AddOrder;