//this was created to run multiple sagas otherwise in store.js we will have to write sagaMiddleware.run(fetchCollectionsStart); 
//multiple times for as many Saga MWs we had to run
import { call, all } from 'redux-saga/effects';
import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga(){
//all() simillar to Promise.all() takes multiple sagas otherwise - yield firstSaga(); yield secondSaga();
//but then the sagas wont run at the same time because yield wates for the value to resolve
    yield all([
        call(shopSagas), call(userSagas), call(cartSagas)//can do it like this also - fetchCollectionsStart() without call()
    ]) 

}