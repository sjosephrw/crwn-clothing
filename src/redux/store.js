//applyMiddleware sits between the action and the root reducer and can be used to log to the console the action
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';//to store the state in local storage, //other wise when we refresh the browser the cart data disappears

//the MW that the store is expecting from redux is a array, if we need to add more things to the MW then add it to the array below
//we could have done it without a array but we might need to passs in several MW's in the future

// const middlewares = [logger];
const middlewares = [];

if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger);//only log the state stored in redux when in development
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistStore};//now we are exporting the persistor as well, 
//********** */so now we have to update our root reducer 