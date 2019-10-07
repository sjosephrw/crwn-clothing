import React from 'react';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';


const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
        {
            cartItems.map(cartItem =>
                <CartItem key={cartItem.id} item={cartItem}/>    
            )
        }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

//advanced destructuring - { user: {currentUser }, cart: {hidden}}, get the cart hidden value from the this.state.cart abd currentUser from this.state.user
const mapStateToProps = ({cart: { cartItems }}) => ({
    cartItems
    //because of this we can do - const Header = ({ hidden, currentUser }) => (
});

export default connect(mapStateToProps)(CartDropdown);