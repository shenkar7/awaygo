import './Layout.css';
import logoImg from '../assets/img/logo.jpg';
import React, {useState, useEffect} from 'react';
import Menu from './Menu/Menu';
import Spinner from '../components/Spinner/Spinner';
import axios from 'axios';


const Layout = () => {

    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState(null);
    const [foodCategories, setFoodCategories] = useState(null);

    let id;
    const params = new URLSearchParams(document.location.search.substring(1));
    id = params.get('id')

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
        content = (
            <div>
                <header>
                    <img src={logoImg} alt="logo"/>
                </header>
                <main className='main'>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.freetext}</p>
                    <Menu foodCategories={foodCategories}/>
                </main>
            </div>
        )
    }

    return content;
}

export default Layout;