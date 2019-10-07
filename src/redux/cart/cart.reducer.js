import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,//initially hide the cart
    cartItems: []
}

//state will be passed into the recuder by redux when ever a action fires
//state = INITIAL_STATE seting a default value for state
//INITIAL_STATE  state before the action
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){//from cart.actions.js
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,//return initail state
                hidden: !state.hidden//and the hidden value
            }
        //adding items to cart    
        case CartActionTypes.ADD_ITEM: 
            return {
                ...state,//return initail state
                // cartItems: state.cartItems.push(action.payload)
                cartItems: addItemToCart(state.cartItems, action.payload)//spread in the existing cartItems and append the newItem
            }            
        default:
            return state;//return initial state
    }
}

export default cartReducer;