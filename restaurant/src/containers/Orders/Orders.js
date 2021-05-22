import './Orders.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OrderWindow from './OrderWindow/OrderWindow';
import OrderSmallWindow from './OrderSmallWindow/OrderSmallWindow';
import SubHeader from './SubHeader/SubHeader';
import PageHeader from '../../components/PageHeader/PageHeader';
import Modal from '../../components/Modal/Modal';
import AddOrder from './AddOrder/AddOrder';
import ViewOrder from './ViewOrder/ViewOrder';
import NewOrder from './NewOrder/NewOrder';
import MenuSiteClosure from './MenuSiteClosure/MenuSiteClosure';
import DishesVisibility from './DishesVisibility/DishesVisibility';
import Spinner from '../../components/Spinner/Spinner';
import OrdersPageContext from './AddOrder/OrdersPageContext';


const Orders = props => {

    const [orders, setOrders] = useState(null);
    const [customersList, setCustomersList] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [foodCategories, setFoodCategories] = useState(null);

    const [page, setPage] = useState('orders');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [addOrderWindow, setAddOrderWindow] = useState(false);
    const [viewOrderWindow, setViewOrderWindow] = useState(false);
    const [newOrderWindow, setNewOrderWindow] = useState(false);
    const [menuSiteClosureWindow, setMenuSiteClosureWindow] = useState(false);
    const [dishesVisibilityWindow, setDishesVisibilityWindow] = useState(false);

    const allModalClosed = () => {
        return (!addOrderWindow && !viewOrderWindow && !newOrderWindow && !menuSiteClosureWindow && !dishesVisibilityWindow);
    }

    if (shouldRefresh && allModalClosed()) {
        window.location.reload();
    }

    let newOrders = null;
    if (orders){
        newOrders = orders.filter(order => order.status === 'new');
        if (newOrders.length > 0 && !newOrderWindow) {
            setNewOrderWindow(newOrders[0]);
        }
    }

    const originURL = window.location.origin;

    useEffect(() => {
        const getCustomers = axios.get(originURL + "/customers");
        const getOrders = axios.get(originURL + "/orders");
        const getRestaurant = axios.get(originURL + "/my_restaurant");

        axios.all([getCustomers, getOrders, getRestaurant])
            .then((responses) => {
                console.log("SUCCESS getting customers, orders and restaurant");
                
                setCustomersList(responses[0].data);
                setOrders(responses[1].data);
                setRestaurant(responses[2].data)

                axios.get(originURL + '/foodcategories/' + responses[2].data.id + '/')
                    .then((res) => {
                        console.log("SUCCESS getting foodcategories");
                        setFoodCategories(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log("ERROR getting foodcategories");
                        console.log(err.message);
                        setError(err);
                    })
                
            })
            .catch((errors) => {
                console.log("ERROR getting customers, orders and my_restaurant");
                console.log(errors);
                setError(errors);
            })
    }, []);

    useEffect(() => {
        const dbOrdersChanged = (newOrders) => {
            if (newOrders.length !== orders.length) 
                return true;
            else
                return false;
        }

        if(!loading && !error){
            const interval = setInterval(() => {
                axios.get(originURL + "/orders")
                .then(res => {
                    console.log("SUCCESS getting orders");
                    if(dbOrdersChanged(res.data)){
                        clearInterval(interval);
                        setShouldRefresh(true);
                    }
                })
                .catch(err => {
                    console.log("Error getting orders");
                    console.log(err.message);
                })
                
            }, 30000);
        }
    }, [loading, error]);

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

        const ordersDelivered = orders.filter(order => order.status === "delivered")
                    .map(order => (
                        <OrderSmallWindow
                            key={order.id}
                            order={order}
                            click={() => setViewOrderWindow(order)}
                        />
                    ));

        const ordersCanceled = orders.filter(order => order.status === "canceled")
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

        const menuSiteClosure = <MenuSiteClosure restaurant={restaurant} setRestaurant={setRestaurant}/>

        const dishesVisibility = <DishesVisibility foodCategories={foodCategories} setFoodCategories={setFoodCategories} modalClose={setDishesVisibilityWindow}/>;

        let pageContent = null;
        console.log(page);
        switch (page) {
            case 'orders':
                pageContent = (
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
                );
                break;
            case 'history':
                pageContent = (
                    <div>
                        <span className="link" onClick={() => setPage('orders')}>
                            חזרה להזמנות
                            {" "}
                            <i class="fas fa-chevron-circle-right"></i>
                        </span>
                        <div className="all-orders-window">
                            <div className="columns-titles">
                                <h3>הזמנות שבוטלו</h3>
                                <div className="title-seperator"></div>
                                <h3>הזמנות שהתבצעו</h3>
                            </div>
                            <div className="orders-columns">
                                <div className="orders-column">
                                    {ordersDelivered}
                                </div>
                                <div className="column-seperation"></div>
                                <div className="orders-column">
                                    {ordersCanceled}
                                </div>
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                console.log('Unable to show a page');
        }
        content = (
            <React.Fragment>

                {viewOrderWindow ? <Modal content={viewOrder} modalClick={() => setViewOrderWindow(false)}/> : null}
                {addOrderWindow ? <Modal content={addOrder} modalClick={() => setAddOrderWindow(false)}/> : null}
                {newOrderWindow ? <Modal content={newOrder}/> : null}
                {addOrderWindow ? <Modal content={addOrder} modalClick={() => setAddOrderWindow(false)}/> : null}
                {menuSiteClosureWindow ? <Modal content={menuSiteClosure} modalClick={() => setMenuSiteClosureWindow(false)}/> : null}
                {dishesVisibilityWindow ? <Modal content={dishesVisibility} modalClick={() => setDishesVisibilityWindow(false)}/> : null}

                <PageHeader/>
                <main>
                    <SubHeader
                        addOrderHandler={() => setAddOrderWindow(true)}
                        historyHandler={() => setPage('history')}
                        menuSiteClosureHandler={() => setMenuSiteClosureWindow(true)}
                        dishesVisibilityHandler={() => setDishesVisibilityWindow(true)}
                    />
                    {pageContent}
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