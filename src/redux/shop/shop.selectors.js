import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;


export const selectCollections = createSelector(
    [selectShop],//this could be a array
    shop => shop.collections
);

