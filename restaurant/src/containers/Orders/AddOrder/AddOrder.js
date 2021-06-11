import React, {useState} from 'react';
import './AddOrder.css';
import axios from 'axios';
import {getCookie, getDistanceFromLatLonInKm} from '../../../assets/functions';
import OrderDetails from './OrderDetails/OrderDetails';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import TimingOrder from '../../../components/TimingOrder/TimingOrder';
import Spinner from '../../../components/Spinner/Spinner';


const AddOrder = props => {

    const [status, setStatus] = useState(null);

    const [order, setOrder] = useState({
        restaurant: props.restaurant.id,
        city: "",
        street: "",
        number: "",
        apartment: "",
        customer: {
            phone_number: "",
            first_name: "",
            last_name: "",
            email: ""
        },
        remark: "",
        dishes_in_order: []
    });

    // valid only when all are true. updating in realtime on each onChange()
    const [validation, setValidation] = useState(
        {
            phone_number: false,
            email: true,    // not a required field, so true as default
            first_name: false,
            last_name: false,
            city: false,
            street: false,
            number: false,
            apartment: true, // not a required field, so true as default
            nonEmptyCart: false
        }
    );
    
    // updating on submit (to color the unvalid fields in red)
    const [submitValidation, setSubmitValidation] = useState(
        {
            phone_number: true,
            email: true,
            first_name: true,
            last_name: true,
            city: true,
            street: true,
            number: true,
            apartment: true,
            nonEmptyCart: true
        }
    );

    const [invalid, setInvalid] = useState(false);
    
    const allValid = () => {
        return new Promise((resolve, reject) => {
            for (let key in validation) {
                if (!validation[key]){
                    console.log('INVALID incorrect field');
                    if (key === "nonEmptyCart")
                        setInvalid("תזמן הזמנה (עגלה ריקה) *");
                    else
                        setInvalid("תזמן הזמנה (נתונים חסרים) *");
                    reject();
                    return;
                }
            }
            // check if address is valid by google
            setStatus("loading");
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    key: process.env.REACT_APP_GOOGLE_API_KEY,
                    address: order.city + " " + order.street + " " + order.number
                }
            })
            .then(res => {
                console.log("SUCCESS getting google maps api")
                setStatus(null);

                if (res.data.status !== "OK") {
                    console.log("INVALID incorrect address");
                    setInvalid("תזמן הזמנה (כתובת לא תקינה) *");
                    reject();
                    return;
                }
                else if ('partial_match' in res.data.results[0]){
                    console.log("INVALID partial_match address");
                    setInvalid("תזמן הזמנה (כתובת לא תקינה) *");
                    reject();
                    return;
                }
                else {
                    const customerLat = res.data.results[0].geometry.location.lat;
                    const customerLng = res.data.results[0].geometry.location.lng;
                    const deliveryDistance = getDistanceFromLatLonInKm(props.restaurant.lat, props.restaurant.lng, customerLat, customerLng);
                    if(deliveryDistance > 60){
                        console.log("INVALID too far address");
                        setInvalid("תזמן הזמנה (כתובת רחוקה מדי) *");
                        reject();
                        return;
                    }
                    else {
                        console.log("VALID address by google");
                        resolve({
                            customerLat: customerLat,
                            customerLng: customerLng,
                            deliveryDistance: deliveryDistance
                        });
                    }
                }            
            })
            .catch(err => {
                console.log("ERROR getting google maps api");
                console.log(err.message);
                setStatus("error")
                reject();
            })
        })
    }

    const createNewOrderWithIds = oldOrder => {        
        const newOrder = {
            ...oldOrder,
            dishes_in_order: [...oldOrder.dishes_in_order]
        };

        for(let i = 0; i < oldOrder.dishes_in_order.length; i++){
            newOrder.dishes_in_order[i] = {
                ...oldOrder.dishes_in_order[i],
                dish: oldOrder.dishes_in_order[i].dish.id,
                extras: [...oldOrder.dishes_in_order[i].extras],
            }
            for(let j=0; j < oldOrder.dishes_in_order[i].extras.length; j++) {
                newOrder.dishes_in_order[i].extras[j] = oldOrder.dishes_in_order[i].extras[j].id;
            }
        }
        
        return(newOrder);
    }

    const submitHandler = async timing => {
        let valid;
        const newOrder = {...order};
        try{
            const geoData = await allValid();
            newOrder.address_lat = geoData.customerLat;
            newOrder.address_lng = geoData.customerLng;
            newOrder.delivery_distance = geoData.deliveryDistance;
            valid = true;
        }
        catch (value){
            valid = false;
        }
        if (valid){
            setStatus('loading');
            const orderWithIds = createNewOrderWithIds(newOrder);
            orderWithIds.status = "process";
            orderWithIds.process_date_time = new Date(Date.now());
            orderWithIds.timing_date_time = new Date(Date.now() + timing * 60 * 1000);

            const originURL = window.location.origin;
            const csrftoken = getCookie('csrftoken');

            axios.post(originURL + '/order_add',
                orderWithIds,
                {
                    headers: {'X-CSRFTOKEN': csrftoken,},
                },
            )
            .then(res => {
                console.log("SUCCESS adding order")
                props.successClose();
                window.location.reload();
            })
            .catch(err => {
                console.log("ERROR posting order");
                console.log(err.message);
                setStatus("error");
            })
        }
        else 
            setSubmitValidation(validation);
    }

    if (order.dishes_in_order.length === 0 && validation.nonEmptyCart){
        const newValidation = validation;
        newValidation.nonEmptyCart = false;
        setValidation(newValidation);
    }
    else if (order.dishes_in_order.length > 0 && !validation.nonEmptyCart){
        const newValidation = validation;
        newValidation.nonEmptyCart = true;
        setValidation(newValidation);
        setInvalid(false);
    }

    let content;

    if (status === 'loading'){
        content = (
            <div className = "spinner-or-error">
                <Spinner/>
            </div>
        );
    }
    else if (status === 'error'){
        content = (
            <div className = "spinner-or-error">
                <i className="fas fa-exclamation-triangle"></i>
                <br/>
                שגיאת תקשורת ביצירת ההזמנה
            </div>
        );
    }
    else {
        content = (
            <div className="add-order-window">
                <div class="cart-and-details">
                    <div className="customer-and-menu">
                        <OrderDetails
                            order={order}
                            setOrder={setOrder}
                            validation={validation}
                            setValidation={setValidation}
                            validFields={submitValidation}
                            setValidFields={setSubmitValidation}
                            setInvalid={setInvalid}
                            />
                        <Menu setOrder={setOrder}/>
                    </div>
                    <Cart order={order} setOrder={setOrder}/>
                </div>
                <TimingOrder timingButtonHandler={submitHandler} invalid={invalid}/>
            </div>
        );
    }

    return content;
}

export default AddOrder;