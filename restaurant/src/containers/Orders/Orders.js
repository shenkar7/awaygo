import './Orders.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OrderWindow from './OrderWindow/OrderWindow';
import OrderSmallWindow from './OrderSmallWindow/OrderSmallWindow';
import SearchDisplay from './SearchDisplay/SearchDisplay';
import PageHeader from '../../components/PageHeader/PageHeader';
import Modal from '../../components/Modal/Modal';
import AddOrder from '../AddOrder/AddOrder';
import ViewOrder from './ViewOrder/ViewOrder';
import Spinner from '../../components/Spinner/Spinner';

// fake data
// import {orders} from '../../fakeData';


const Orders = props => {

    const [orders, setOrders] = useState(null);
    const [dishes, setDishes] = useState(null);
    // const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [addOrderWindow, setAddOrderWindow] = useState(false);
    const [viewOrderWindow, setViewOrderWindow] = useState(false);

    useEffect(() => {

        // const getCustomers = axios.get("http://127.0.0.1:8000/customers")
        const getDishes = axios.get("http://127.0.0.1:8000/dishes")
        const getOrders = axios.get("http://127.0.0.1:8000/orders")


        axios.all([/*getCustomers, */getDishes, getOrders])
            .then((responses) => {
                // setCustomers(responses[0].data);
                setDishes(responses[0].data);
                setOrders(responses[1].data);
            })
            .catch((errors) => {
                setError(errors);
            })
            .then(() => {
                setLoading(false);
            })
    }, []);

    const errorMessage = (
        <div className="error-message">
            <p>
                <i className="fas fa-exclamation-triangle"></i>
            </p>
            <p>שגיאת תקשורת</p>
        </div>
    );

    let content = "hey";

    if (loading) {
        content = <Spinner/>
    }
    else if(error){
        content =  errorMessage;
    }
    else {
        // console.log(customers);
        // console.log(dishes);
        

        // creating order windows for map()
        const orderWindowCreator = (order) => {
            return (
                <OrderWindow
                    key={order.id}
                    order={order}
                    click={() => setViewOrderWindow(order)}
                />
            );
        }

        const ordersProcess = orders.filter(order => order.status === "process")
                    .map(orderWindowCreator);

        const ordersSent = orders.filter(order => order.status === "sent")
                    .map(orderWindowCreator);

        const ordersDelivered = orders.filter(order => order.status === "delivered")
                    .map(order => (
                        <OrderSmallWindow
                            key={order.id}
                            order={order}
                            click={() => setViewOrderWindow(order)}
                        />
                    ));
        
        const addOrder = <AddOrder/>

        const viewOrder = <ViewOrder order={viewOrderWindow}/>

        content = (
            <React.Fragment>

                {viewOrderWindow ? <Modal content={viewOrder} modalClick={() => setViewOrderWindow(false)}/> : null}
                {addOrderWindow ? <Modal content={addOrder} modalClick={() => setAddOrderWindow(false)}/> : null}

                <PageHeader/>
                <main>
                    <SearchDisplay addOrderHandler={() => setAddOrderWindow(true)}/>
                    <div className="all-orders-window">
                        <div className="columns-titles">
                            <h3>בוצעו</h3>
                            <div className="title-seperator"></div>
                            <h3>נשלחו</h3>
                            <div className="title-seperator"></div>
                            <h3>בטיפול</h3>
                        </div>
                        <div className="orders-columns">
                            <div className="orders-column">
                                {ordersProcess}
                            </div>
                            <div className="column-seperation"></div>
                            <div className="orders-column">
                                {ordersSent}
                            </div>
                            <div className="column-seperation"></div>
                            <div className="orders-column">
                                {ordersDelivered}
                            </div>

                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }

    return content;
}

export default Orders;