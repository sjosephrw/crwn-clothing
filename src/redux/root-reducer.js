import { combineReducers } from 'redux';//to combine the different reducers
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});

