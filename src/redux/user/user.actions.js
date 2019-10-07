import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
    //these must be in the order defined in the userReducer
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user//optional but we need it in the userReducer so it was passed in here.
})