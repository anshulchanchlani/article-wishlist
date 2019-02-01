import {LOGIN_USER, IS_USER_LOGGED_IN,LOGIN_ERROR} from '../actions/authActions'

export default function(state=null,action){
    switch(action.type){
        case LOGIN_USER:
             return action.payload.data ||false;
        default: return state;
    }
    
}