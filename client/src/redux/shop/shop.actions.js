import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// })

//all thunx is a action creator that returns a function that gets a dispatch, very simillar to 
//map dispatch to props

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})


export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})
//*******IMPORTANT SINCE REDUX THUNK MW IS ENABLED each time we attempt to dispatch a function instead of a obj.
//the mw will call that function with dispatch as the 1st arg.

//all thunx is a action creator that returns a function that gets a dispatch, very simillar to 
//map dispatch to props
//in short it's a function that returns a function that gets access to dispatch

//lec. 175 we are now passing the fetchCollectionsStartAsync into shop.saga.js
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        //this is slightly diffenent to user authentication because we are only getting data
        //WE DONT NEED THIS WE CAN ALSO USE THE FETCH API LIKE SHOWN BELOW lec. 166
        const collectionRef = firestore.collection('collections');//('collections'); - name of obj. holding the items data
        // fetch('https://<FIRBASE API END POINT>/collections').then(res => res.json()).then(collections => console.log(collections));
        
        //fetchCollectionsStart is declared above
        dispatch(fetchCollectionsStart);//when this fires dispath will trigger the shop reducer FETCH_COLLECTIONS_START
        //THAT IN TURN TRIGGERS THE loading value to true

        //whenever the collectionRef updates or whenever this code runs for the first time
        //this code will send us the collections json data

        //******IMPORTANT */If we are using PROMISES and not Observable Observer Pattern then
        collectionRef.get().then(snapshot => {
            //console.log(snapshot);
            //now though the routing and ids were removed from the db data we need to get them back into our App
            //so
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log(collectionsMap);
            // updateCollections(collectionsMap); 
            //we can move the state obj. below into a redux state 
            //or we can move the entire collectionRef.get().then(snapshot => { into a REDUX state  
            //for this we'll be using REDUX THUNK for asynchronous REDUX
            //this.setState({ loading: false });//data has finished loading stop rendering the loading icon          
        
            //fetchCollectionsSuccess is declared above
            dispatch(fetchCollectionsSuccess(collectionsMap))
            //when this fires dispath will trigger the shop reducer FETCH_COLLECTIONS_SUCCESS
        //THAT IN TURN TRIGGERS THE loading value to FALSE        

        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));//when this fires dispath will trigger the shop reducer FETCH_COLLECTIONS_FAILURE

    }
}