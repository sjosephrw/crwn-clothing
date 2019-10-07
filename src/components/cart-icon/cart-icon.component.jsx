import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartIcon = ({ toggleCartHidden, cartItems }) => (
    <div className='cart-icon' onClick={ toggleCartHidden }>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{ cartItems.length }</span>
    </div>
)

//***********LEC 101 kind of confusing */
const mapDispatchToProps = dispatch => ({
    //dispatch - a way for redux to know that whatever you are passing into me is a action obj. that I am going to pass into every reducer
    toggleCartHidden: () => dispatch(toggleCartHidden())//toggleCartHidden() - is the action obj. so we are dispatching the action obj.
    //so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
});

const mapStateToProps = ({cart: { cartItems }}) => ({
    //state.user comes from the rootReducer, .currentUser comes from the userReducer
    cartItems: cartItems
    //because of this we can do - const Header = ({ hidden, currentUser }) => ( 
});

// export default connect(null, mapDispatchToProps)(CartIcon);//mapDispatchToProps - so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);//mapDispatchToProps - so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
