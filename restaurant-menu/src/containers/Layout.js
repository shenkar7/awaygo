import './Layout.css';
import logoImg from '../assets/img/logo.jpg';
import React, {useState, useEffect} from 'react';
import OrderContext from '../OrderContext';
import Menu from './Menu/Menu';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import Spinner from '../components/Spinner/Spinner';
import axios from 'axios';


const Layout = () => {

    let id;
    const params = new URLSearchParams(document.location.search.substring(1));
    id = params.get('id');

    const [status, setStatus] = useState('loading');
    const [restaurant, setRestaurant] = useState(null);
    const [foodCategories, setFoodCategories] = useState(null);
    const [page, setPage] = useState({page: "menu", info: null});
    
    const [order, setOrder] = useState({
        restaurant: id,
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

    let originURL = window.location.origin;
    originURL = "http://127.0.0.1:8000"; // For local run

    useEffect(() => {

        const getRestaurant = axios.get(originURL + '/restaurant/' + id + '/')
        const getFoodCategories = axios.get(originURL + '/foodcategories/' + id + '/')
        
        axios.all([getRestaurant, getFoodCategories])
        .then(res => {
            console.log("SUCCESS getting restaurant and foodCategories");
            setRestaurant(res[0].data);
            if(res[0].data.menu_open){
                setFoodCategories(res[1].data);
                setStatus(null);
            }
            else
                setStatus("menu_close");
        })
        .catch(errors => {
            console.log("ERROR getting restaurant and foodCategories");
            console.log(errors);
            setStatus('error');
        })
    }, [id, originURL]);


    let content;

    if (status === 'loading'){
        content = (
            <main className='loading'>
                <Spinner/>
            </main>
        );
    }
    else if(status === "error"){
        content = <div className="error">שגיאת תקשורת</div>
    }
    else if(status === "menu_close"){
        content = (
            <React.Fragment>
                <div className="restaurant-back-img">
                    <img alt="pic" src={originURL + restaurant.background_img}/>
                </div>
                <div className="menu_close">המסעדה סגורה כרגע להזמנות</div>
            </React.Fragment>
        );
    }
    else {
        let main = null;
        if(page.page === "menu")
            main = <Menu foodCategories={foodCategories} submitHandler={() => setPage({page: "customer-info", info: null})}/>;
        else if (page.page === "customer-info")
            main = <CustomerInfo back={() => setPage({page: "menu", info: null})} setPage={setPage}/>
        else if (page.page === "success")
            main = (
                <div className="success">
                    <br/>
                    <h3>ההזמנה בוצעה בהצלחה</h3>
                    מספר הזמנה {page.info}
                </div>
            );

        content = (
            <React.Fragment>
                <div className="restaurant-back-img">
                    <img alt="pic" src={originURL + restaurant.background_img}/>
                </div>
                <main className='main'>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.freetext}</p>
                    {main}
                </main>
            </React.Fragment>
        ) 
    }
    
    return (
        <OrderContext.Provider value={[order, setOrder]}>
            <div className="layout">
                <header>
                    <img src={logoImg} alt="logo"/>
                </header>
                {content}
            </div>
        </OrderContext.Provider>
    );
}

export default Layout;