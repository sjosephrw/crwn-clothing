export const setCurrentUser = (user) => ({
    //these must be in the order defined in the userReducer
    type: 'SET_CURRENT_USER',
    payload: user
})