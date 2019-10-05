//applyMiddleware sits between the action and the root reducer and can be used to log to the console the action
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

//the MW that the store is expecting from redux is a array, if we need to add more things to the MW then add it to the array below
//we could have done it without a arrya but we might need to passs in several MW's in the future
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;