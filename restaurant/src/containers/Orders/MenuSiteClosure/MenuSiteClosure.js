import './MenuSiteClosure.css';
import React, {useState} from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';

const MenuSiteClosure = props => {

    const [open, setOpen] = useState(true);

    const content = (
        <div className="menu-site-closure">
            <h2>פתיחת/השבתת אתר התפריט ללקוחות</h2>
            {open ? <p>האתר פתוח להזמנות</p>
            : <p>האתר סגור להזמנות</p>}
            <ToggleSwitch/>
        </div>
    );

    return content;
}

export default MenuSiteClosure;