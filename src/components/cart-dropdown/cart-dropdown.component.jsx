import React from 'react';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { withRouter } from 'react-router-dom';

const CartDropdown = ({cartItems, history, dispatch}) => (
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
        <CustomButton onClick={()=>{ 
            history.push('/checkout') 
            dispatch(toggleCartHidden())//to hide the cart drop down only when we get to the checkout page by clicking the got to checkout btn in the cart dropdown
        }}>GO TO CHECKOUT</CustomButton>
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

//********* */it can be done this way also but if we dont pass a 2nd arg. into connect connect will automatically 
//********* */ pass dispatch into the props we can see this by typing otherProps const CartDropdown = ({cartItems, history, ..otherProps}) => (
//***********LEC 101 kind of confusing */
// const mapDispatchToProps = dispatch => ({
//     //dispatch - a way for redux to know that whatever you are passing into me is a action obj. that I am going to pass into every reducer
//     toggleCartHidden: () => dispatch(toggleCartHidden())//toggleCartHidden() - is the action obj. so we are dispatching the action obj.
//     //so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
// });

//withRouter HOC gives us access to the , HOC also take components as their args. 
//withRouter returns match, history and location props
//thats why we can do - const CartDropdown = ({, history}) => (

//********* */if we dont pass a 2nd arg. into connect connect will automatically 
//********* */ pass dispatch into the props we can see this by typing otherProps const CartDropdown = ({cartItems, history, ..otherProps}) => (

export default withRouter(connect(mapStateToProps)(CartDropdown));