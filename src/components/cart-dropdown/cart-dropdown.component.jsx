import React from 'react';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { withRouter } from 'react-router-dom';

const CartDropdown = ({cartItems, history}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
        {   cartItems.length > 0 
            ?
            cartItems.map(cartItem =>
                <CartItem key={cartItem.id} item={cartItem}/>    
            )
            :
            <span className='empty-message'>CART EMPTY.</span>
        }
        </div>
        <CustomButton onClick={()=>history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
    </div>
)

//advanced destructuring - { user: {currentUser }, cart: {hidden}}, get the cart hidden value from the this.state.cart abd currentUser from this.state.user
// const mapStateToProps = ({cart: { cartItems }}) => ({
//     cartItems
//     //because of this we can do - const Header = ({ hidden, currentUser }) => (
// });

// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
//     //because of this we can do - const Header = ({ hidden, currentUser }) => (
// });

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
    //because of this we can do - const Header = ({ hidden, currentUser }) => (
});

//withRouter HOC gives us access to the , HOC also take components as their args. 
//withRouter returns match, history and location props
//thats why we can do - const CartDropdown = ({, history}) => (
export default withRouter(connect(mapStateToProps)(CartDropdown));