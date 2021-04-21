import './Orders.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OrderWindow from './OrderWindow/OrderWindow';
import OrderSmallWindow from './OrderSmallWindow/OrderSmallWindow';
import SearchDisplay from './SearchDisplay/SearchDisplay';
import PageHeader from '../../components/PageHeader/PageHeader';
import Modal from '../../components/Modal/Modal';
import AddOrder from './AddOrder/AddOrder';
import ViewOrder from './ViewOrder/ViewOrder';
import NewOrder from './NewOrder/NewOrder';
import Spinner from '../../components/Spinner/Spinner';
import OrdersPageContext from './AddOrder/OrdersPageContext';


const Orders = props => {

    const [orders, setOrders] = useState(null);
    const [customersList, setCustomersList] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [foodCategories, setFoodCategories] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [addOrderWindow, setAddOrderWindow] = useState(false);
    const [viewOrderWindow, setViewOrderWindow] = useState(false);
    const [newOrderWindow, setNewOrderWindow] = useState(false);

    let newOrders = null;
    if (orders){
        newOrders = orders.filter(order => order.status === 'new');
        if (newOrders.length > 0 && !newOrderWindow) {
            setNewOrderWindow(newOrders[0]);
        }
    }

    useEffect(() => {
        const getCustomers = axios.get("http://127.0.0.1:8000/customers");
        const getOrders = axios.get("http://127.0.0.1:8000/orders");
        const getRestaurant = axios.get("http://127.0.0.1:8000/my_restaurant");

        axios.all([getCustomers, getOrders, getRestaurant])
            .then((responses) => {
                setCustomersList(responses[0].data);
                setOrders(responses[1].data);
                setRestaurant(responses[2].data)
            })
            .catch((errors) => {
                console.log("ERROR getting customers, orders and my_restaurant");
                console.log(errors);
                setError(errors);
            })
    }, []);

    useEffect(() => {
        if (restaurant) {
            axios.get('http://127.0.0.1:8000/foodcategories/' + restaurant.id + '/')
                .then((res) => {
                    setFoodCategories(res.data)
                })
                .catch((err) => {
                    console.log("ERROR getting foodcategories");
                    console.log(err.message);
                    setError(err);
                })
                .then(() => {
                    setLoading(false);
                })
        }
    }, [restaurant]);

    const orderUpdateHandler = newOrder => {
        const newOrders = [...orders];
        for (let i=0; i < newOrders.length; i++){
            if(newOrders[i].id === newOrder.id)
                newOrders[i] = newOrder;
        }
        setOrders(newOrders);
    }

    const errorMessage = (
        <div className="error-message">
            <p>
                <i className="fas fa-exclamation-triangle"></i>
            </p>
            <p>שגיאת תקשורת</p>
        </div>
    );

    let content = null;

    if (loading) {
        content = <div className="spinner"><Spinner/></div>
    }
    else if(error){
        content =  errorMessage;
    }
    else {
        // creating order windows for map()
        const orderWindowCreator = (order) => {
            return (
                <OrderWindow
                    key={order.id}
                    order={order}
                    orderUpdateHandler={orderUpdateHandler}
                    click={() => setViewOrderWindow(order)}
                />
            );
        }

        const ordersProcess = orders.filter(order => order.status === "process")
                    .map(orderWindowCreator);

        const ordersReady = orders.filter(order => order.status === "ready")
                    .map(orderWindowCreator);

        const ordersSent = orders.filter(order => order.status === "sent")
                    .map(order => (
                        <OrderSmallWindow
                            key={order.id}
                            order={order}
                            click={() => setViewOrderWindow(order)}
                        />
                    ));

        //  delivered orders for history
        
        const addOrder = <AddOrder customersList={customersList} restaurantId={restaurant.id} successClose={() => setAddOrderWindow(false)}/>

        const viewOrder = <ViewOrder order={viewOrderWindow} orderUpdateHandler={orderUpdateHandler} modalClose={setViewOrderWindow}/>

        const newOrder = <NewOrder order={newOrderWindow} orderUpdateHandler={orderUpdateHandler} modalClose={setNewOrderWindow}/>

        content = (
            <React.Fragment>

                {viewOrderWindow ? <Modal content={viewOrder} modalClick={() => setViewOrderWindow(false)}/> : null}
                {addOrderWindow ? <Modal content={addOrder} modalClick={() => setAddOrderWindow(false)}/> : null}
                {newOrderWindow ? <Modal content={newOrder}/> : null}

                <PageHeader/>
                <main>
                    <SearchDisplay addOrderHandler={() => setAddOrderWindow(true)}/>
                    <div className="all-orders-window">
                        <div className="columns-titles">
                            <h3>נאסף</h3>
                            <div className="title-seperator"></div>
                            <h3>מוכן לאיסוף</h3>
                            <div className="title-seperator"></div>
                            <h3>בטיפול</h3>
                        </div>
                        <div className="orders-columns">
                            <div className="orders-column">
                                {ordersProcess}
                            </div>
                            <div className="column-seperation"></div>
                            <div className="orders-column">
                                {ordersReady}
                            </div>
                            <div className="column-seperation"></div>
                            <div className="orders-column">
                                {ordersSent}
                            </div>

                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }

    return (
        <OrdersPageContext.Provider value={{customersList: customersList, foodCategories: foodCategories}}>
            {content} 
        </OrdersPageContext.Provider>
    );
}

export default Orders;