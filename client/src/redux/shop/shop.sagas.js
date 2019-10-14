import { takeLatest, call, put, all } from 'redux-saga/effects';//we need to bring in certain tools that help us to listen or create certain events
//listen to every action of a specific type we pass in. 
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
//*********IMPORTANT THE purpose of the saga MW is to run the SAGAS all at the same time, in a 
//non blocking way


//suppose the user requests fetchCollectionAsync multiple times the yield will make the saga block the previous req.
export function* fetchCollectionsAsync(){
    yield console.log('Triggered!');//all generator functions must have yield something

    try {
        
        //this is slightly diffenent to user authentication because we are only getting data
        //WE DONT NEED THIS WE CAN ALSO USE THE FETCH API LIKE SHOWN BELOW lec. 166
        const collectionRef = firestore.collection('collections');//('collections'); - name of obj. holding the items data
        // fetch('https://<FIRBASE API END POINT>/collections').then(res => res.json()).then(collections => console.log(collections));
        
        //yield is very simillar to async await lec. 176 (Yield also allows the code to stop incase yield does not receive any data)
        //yield also gives the SAGA more control over the code.
        const snapshot = yield collectionRef.get();

        //const collectionsMap = convertCollectionsSnapshotToMap(snapshot);//The line below can also be done this way
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);//the 1st param call takes is a function, the subsequent args. are 
        //ther params of the function that was passed as the 1st arg. to call 

        //put is the SAGA effect for creating actions, it is similar to dispatch but we have to yield it
        yield put(fetchCollectionsSuccess(collectionsMap));//this puts out a obj. that has a type and a payload

        // //******IMPORTANT */If we are using PROMISES and not Observable Observer Pattern then
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionsSuccess(collectionsMap))     
        // }).catch(error => dispatch(fetchCollectionsFailure(error.message)));//when this fires dispath will trigger the shop reducer FETCH_COLLECTIONS_FAILURE

    } catch (error){
        //put is the SAGA effect for creating actions, it is similar to dispatch but we have to yield it
        yield put(fetchCollectionsFailure(error.message));
    }
 




}


export function* fetchCollectionsStart(){
    //take every does not pause the JS from running the code
    //2nd param takes another generator function in response to the takeEvery listener 
    // yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);//to prevent multiple sagas, so we dont initiate multiple API req.

}

export function* shopSagas(){
    yield (all([call(fetchCollectionsStart)]));
}