import { combineReducers } from 'redux';//to combine the different reducers

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';


import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';//then we get the window.localStorage (descriptiion in react_important folder)
//if you want the window.sessionStorage then refer to lec 124 resources

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cart']//user data is being persisted by firebase, so we need to store only cartData in localStorage
}

// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// });

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);//now we can store cart data in local storage