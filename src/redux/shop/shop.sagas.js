//we need to bring in certain tools that help us to listen or create certain events
import { takeEvery } from 'redux-saga/effects';//listen to every action of a specific type we pass in. 
import ShopActionTypes from './shop.types';

//*********IMPORTANT THE purpose of the saga MW is to run the SAGAS all at the same time, in a 
//non blocking way


//suppose the user requests fetchCollectionAsync multiple times the yield will make the saga block the previous req.
export function* fetchCollectionsAsync(){
    yield console.log('Triggered!');//all generator functions must have yield something
}


export function* fetchCollectionsStart(){
    //take every does not pause the JS from running the code
    //2nd param takes another generator function in response to the takeEvery listener 
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, )

}