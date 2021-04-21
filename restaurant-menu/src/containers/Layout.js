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

    const [loading, setLoading] = useState(true);
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

    useEffect(() => {

        const getRestaurant = axios.get('http://127.0.0.1:8000/restaurant/' + id + '/')
        const getFoodCategories = axios.get('http://127.0.0.1:8000/foodcategories/' + id + '/')
        
        axios.all([getRestaurant, getFoodCategories])
        .then(res => {
            setRestaurant(res[0].data);
            setFoodCategories(res[1].data);
            setLoading(false);
        })
        .catch(errors => {
            console.log("ERROR getting restaurant and foodCategories");
            console.log(errors);
            setLoading('error');
        })
    }, [id]);


    let content;

    if (loading === true){
        content = <div><Spinner/></div>
    }
    else if(loading === "error"){
        content = <div>שגיאת תקשורת</div>
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
            <div>
                <header>
                    <img src={logoImg} alt="logo"/>
                </header>
                <div className="restaurant-back-img">
                    <img alt="pic" src={"http://127.0.0.1:8000" + restaurant.background_img}/>
                </div>
                <main className='main'>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.freetext}</p>
                    {main}
                </main>
            </div>
        ) 
    }

    return (
        <OrderContext.Provider value={[order, setOrder]}>
            {content}
        </OrderContext.Provider>
    );
}

export default Layout;