import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { BrowserRouter as Router, Switch, Route, Link  } from "react-router-dom";

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link to='/shop'>
                SHOP
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/shop'>
                CONTACT
            </Link>
            {/* <Link to='/shop'>
                SIGN IN
            </Link>                         */}
        </div>        
    </div>
)

export default Header;