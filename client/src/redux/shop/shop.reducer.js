// import SHOP_DATA from './shop.data';
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    // collections: SHOP_DATA
    collections: null,//simillar to the userReducer we are setting this to null because we are getting the data from the DB
    isFetching: false,//because we are moving the state = {loading: true} from the ShopPage to redux
    errorMessage: undefined
}

// const shopReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type){
//         case ShopActionTypes.UPDATE_COLLECTIONS: 
//         return {
//             ...state,//return initail state
//             // cartItems: state.cartItems.push(action.payload)
//             collections: action.payload
//         }    
//         default:
//             return state;
//     }
// }

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ShopActionTypes.FETCH_COLLECTIONS_START: 
        return {
            ...state,//return initail state
            isFetching: true
        }  
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS: 
        return {
            ...state,//return initail state
            isFetching: false,
            collections: action.payload
        }  
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE: 
        return {
            ...state,//return initail state
            isFetching: true,
            errorMessage: action.payload
        }                    
        default:
            return state;
    }
}

export default shopReducer;