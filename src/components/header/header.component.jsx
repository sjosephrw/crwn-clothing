import React from 'react';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import {  Link  } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//hence forth we want the current user value to be received from the userReducer

const Header = ({ hidden, currentUser }) => (
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            <CartIcon/>
            
            {/* <Link to='/shop'>
                SIGN IN
            </Link>                         */}
        </div>
        {//show or hide the cart dropdown if hidden is false or true
            hidden ? 
            null        
            :
            <CartDropdown></CartDropdown>
        }    
    </div>
)

//***********LEC 100 kind of confusing */
//the 1st function we pass in is the function that allows us to access the state that is the root reducer
//state param is the root reducer 
// const mapStateToProps = (state) => ({
//     //state.user comes from the rootReducer, .currentUser comes from the userReducer
//     currentUser: state.user.currentUser,
// });

//advanced destructuring - { user: {currentUser }, cart: {hidden}}, get the cart hidden value from the this.state.cart abd currentUser from this.state.user
const mapStateToProps = ({ user: {currentUser }, cart: {hidden}}) => ({
    //state.user comes from the rootReducer, .currentUser comes from the userReducer
    currentUser,
    hidden
    //because of this we can do - const Header = ({ hidden, currentUser }) => (
});

//***********LEC 100 kind of confusing */
//connect - a HOC are functions that accept components as args. and return a improved component 
// we can pass in 2 functions into the HOC, the 2nd one optional, that give us another HOC that we pass in the Header 
export default connect(mapStateToProps)(Header);//because of this we can do - const Header = ({ hidden, currentUser }) => (