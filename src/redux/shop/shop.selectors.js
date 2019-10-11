import { createSelector } from 'reselect';

import SHOP_DATA from './shop.data';

const selectShop = state => state.shop;//returning state.shop

//we converted the shop data in the redux/shop/shop.data.js to a obj. of obj's instead of a array
//since looping through a array if we have a lot of collections could take long
//so the code below was not necessary
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

export const selectCollections = createSelector(
    [selectShop],//this could be a array
    shop => shop.collections //returning shop.collections
);

//since we modified shop.data.js to be a obj of objs. we need it convert it back to a regular array other wise some parts of the app still treat it as a array of objs.
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    //const obj = {a: 1, b: 2}
    //Obj.keys(obj)//output- [a, b]
    //collections[key] - gives the value
    //const INITIAL_STATE = { collections: null } because we set this to null we have to check for collections is null below
    //if it is null let the collections be equal to a empty array
    (collections) => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        //const INITIAL_STATE = { collections: null } because we set this to null we have to check for collections is null below
        //if it is null let the collections be equal to null
        (collection) => (collection ? collection[collectionUrlParam] : null)
  );

        // collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])//due to data normalization lec. 132 this is not necessary



export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections//!! converting shop.collections value to a boolean value true or false
);