import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';
import wishlistReducer from './wishlistReducer'
import errorsReducer from './errorsReducer'
import {LOGOUT_USER} from '../actions/authActions'
const reducers = combineReducers({
    auth: authReducer,
    items:itemsReducer,
    wishlist:wishlistReducer,
    errors:errorsReducer
})

const rootReducer = (state,action)=>{
    if(action.type===LOGOUT_USER){
        state = undefined;
    }
    return (reducers(state,action))
}

export default rootReducer;
