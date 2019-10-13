import UserActionTypes from './user.types';


//the intial state
const INITIAL_STATE = {
    currentUser: null
}


//state will be passed into the recuder by redux when ever a action fires
//state = INITIAL_STATE seting a default value for state
// const userReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type){
//         //the 2 case conditions stacked on top of each other means that we want what is below to happen in either of the case    
//         case UserActionTypes.SIGN_IN_SUCCESS:
// //        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: action.payload,
//                 error: null//if they 1st try to login and get a error then successfully login, we want the error to disappear
//             }   
//         //the 2 case conditions stacked on top of each other means that we want what is below to happen in either of the case    
//         case UserActionTypes.SIGN_IN_FAILURE:
//   //      case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         //the 2 case conditions stacked on top of each other means that we want what is below to happen in either of the case    
//         case UserActionTypes.GOOGLE_SIGN_IN_START:
//         case UserActionTypes.EMAIL_SIGN_IN_START:
//             return {
//                 ...state
//             }                                               
//         default:
//             return state;
//     }
// }

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UserActionTypes.SIGN_UP_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          error: null
        };      
      case UserActionTypes.SIGN_IN_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          error: null
        };
      case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          currentUser: null,
          error: null
        };
      case UserActionTypes.SIGN_IN_FAILURE:
      case UserActionTypes.SIGN_OUT_FAILURE:
      case UserActionTypes.SIGN_UP_FAILURE:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };

export default userReducer;