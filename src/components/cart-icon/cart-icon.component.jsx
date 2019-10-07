import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={ toggleCartHidden }>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{ itemCount }</span>
    </div>
)

//***********LEC 101 kind of confusing */
const mapDispatchToProps = dispatch => ({
    //dispatch - a way for redux to know that whatever you are passing into me is a action obj. that I am going to pass into every reducer
    toggleCartHidden: () => dispatch(toggleCartHidden())//toggleCartHidden() - is the action obj. so we are dispatching the action obj.
    //so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
});

//**********IMPORTANT if the cart item values dont change and if the output of the selector does not change*/
//then we dont want to rerender the component becuase it's memory inefficient, so we cache (Memoization) the selectors value. we use 'npm i reselect' for this       
// const mapStateToProps = ({cart: { cartItems }}) => ({
//     itemCount: cartItems.reduce((accumalatedQunatity, cartItem) =>  accumalatedQunatity + cartItem.quantity , 0)//0 - initial accumalatedQuantity
//     //because of this we can do - const Header = ({ , itemCount}) => ( 
// });

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
    //because of this we can do - const Header = ({ , itemCount}) => ( 
});

// export default connect(null, mapDispatchToProps)(CartIcon);//mapDispatchToProps - so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);//mapDispatchToProps - so now we can use toggleCartHidden here - CartIcon = ({ toggleCartHidden })
