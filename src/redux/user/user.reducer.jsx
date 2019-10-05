//the intial state
const INITIAL_STATE = {
    currentUser: null
}


//state will be passed into the recuder by redux when ever a action fires
//state = INITIAL_STATE seting a default value for state
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;