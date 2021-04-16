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
    const [page, setPage] = useState("menu");
    
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
        .catch(err => {
            console.log("ERROR! " + err.message);
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
        if(page === "menu")
            main = <Menu foodCategories={foodCategories} submitHandler={() => setPage("customer-info")}/>;
        else if (page === "customer-info")
            main = <CustomerInfo back={() => setPage("menu")}/>
        else if (page === "success")
            main = <h3>ההזמנה בוצעה בהצלחה</h3>;

        content = (
            <div>
                <header>
                    <img src={logoImg} alt="logo"/>
                </header>
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