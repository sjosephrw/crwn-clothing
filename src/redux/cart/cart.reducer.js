import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

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
        //CLEARING items from cart    
        case CartActionTypes.CLEAR_ITEM_FROM_CART: 
            return {
                ...state,//return initail state
                // cartItems: state.cartItems.push(action.payload)
                //filter returns a new array without the item to be deleted
                //filter keeps the values where the function returns true
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)//spread in the existing cartItems and remove the newItem
            }
        //removing item using the decrementor arrow
        case CartActionTypes.REMOVE_ITEM: 
            return {
                ...state,//return initail state
                // cartItems: state.cartItems.push(action.payload)
                //filter returns a new array without the item to be deleted
                cartItems: removeItemFromCart(state.cartItems, action.payload)//spread in the existing cartItems and remove the newItem
            }                                             
        default:
            return state;//return initial state
    }
}

export default cartReducer;