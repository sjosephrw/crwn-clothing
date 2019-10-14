import { createSelector } from 'reselect';

const selectUser = state => state.user;

// export const selectCart = (state) => state.cart;//moved to cart.selectors.js

// export const selectCurrentUser = createSelector(
//   [selectUser, selectCart],//using multiple input selectors
//   (user, cart) => user.currentUser, cart.hidden
// );

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);