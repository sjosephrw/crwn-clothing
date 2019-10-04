import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import {  Link  } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';

const Header = ({currentUser}) => (
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
                :
                <Link to='/signin'>
                    SIGN IN 
                </Link>                
            }
             
            {/* <Link to='/shop'>
                SIGN IN
            </Link>                         */}
        </div>        
    </div>
)

export default Header;