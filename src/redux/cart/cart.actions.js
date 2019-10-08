import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    //these must be in the order defined in the userReducer
    type: CartActionTypes.TOGGLE_CART_HIDDEN
    //payload is optional so we wont be using it here because its not used in the cartReducer either
})

export const addItem = (item) => ({
    //these must be in the order defined in the userReducer
    type: CartActionTypes.ADD_ITEM,
    payload: item//optional but we need it in the userReducer so it was passed in here.
})

export const removeItem = (item) => ({
    //these must be in the order defined in the userReducer
    type: CartActionTypes.REMOVE_ITEM,
    payload: item//optional but we need it in the userReducer so it was passed in here.
})

export const clearItemFromCart = (item) => ({
    //these must be in the order defined in the userReducer
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item//optional but we need it in the userReducer so it was passed in here.    
})