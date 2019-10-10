import SHOP_DATA from './shop.data';
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ShopActionTypes.UPDATE_COLLECTIONS: 
        return {
            ...state,//return initail state
            // cartItems: state.cartItems.push(action.payload)
            collections: action.payload
        }    
        default:
            return state;
    }
}

export default shopReducer;