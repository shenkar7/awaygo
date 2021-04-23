import './MenuSiteClosure.css';
import React, {useState} from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import {getCookie} from '../../../assets/functions';

const MenuSiteClosure = props => {

    const [status, setStatus] = useState(null);

    console.log("props.restaurant.menu_open" + props.restaurant.menu_open);

    const toggleHandler = event => {
        console.log("toggleHandler");
    
        const newRestaurant = {...props.restaurant};
        newRestaurant.menu_open = event.target.checked;
        delete newRestaurant.background_img;

        if (event.target.checked !== props.restaurant.menu_open){
            setStatus("loading");
            const csrftoken = getCookie('csrftoken');

            axios.put("http://127.0.0.1:8000/my_restaurant",
                newRestaurant,
                {
                    headers: {'X-CSRFTOKEN': csrftoken,},
                },
            )
            .then(res => {
                console.log("SUCCESS updating restaurant");
                props.setRestaurant(newRestaurant);
                setStatus(null);
            })
            .catch(err => {
                console.log("ERROR updating restaurant");
                console.log(err.message);
                setStatus("error");
            })
        }
    }


    let content;

    if (status === "loading"){
        content = (
            <div className="loading-and-error">
                <Spinner/>
            </div> 
        );
    }
    else if (status === "error"){
        content = (
            <div className="loading-and-error">
                שגיאת תקשורת
            </div> 
        );
    }
    else {
        content = (
            <React.Fragment>
                {props.restaurant.menu_open ? <p>האתר פתוח להזמנות</p>
                : <p>האתר סגור להזמנות</p>}
                <ToggleSwitch checked={props.restaurant.menu_open} toggleHandler={toggleHandler}/>
            </React.Fragment>
        );
    }

    return (
        <div className="menu-site-closure">
            <h2>פתיחת/השבתת אתר התפריט ללקוחות</h2>
            {content} 
        </div>
    );
}

export default MenuSiteClosure;