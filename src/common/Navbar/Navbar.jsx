import React from 'react';
import Logo from "../../images/logo.png";
import {Link,useNavigate} from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const navigateToLogin=()=>{
        navigate("/register/login")
    }
    return (
        <div className='app__nav'>
            <ul className='app__nav_items'>
                <li className='app__nav_item nav-logo'><Link to="/Home"><img src={Logo}/></Link></li>
                <li className='app__nav_item nav-home'><Link to="/Home" color="white">Home</Link></li>
                <li className='app__nav_item nav-loginButton'><button onClick={navigateToLogin}>Login</button></li>
            </ul>
        </div>
    );
};

export default Navbar;
