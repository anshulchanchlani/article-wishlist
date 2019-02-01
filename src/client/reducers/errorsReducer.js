import {LOGIN_ERROR} from '../actions/authActions'
export default (state=null,action)=>{
    switch(action.type){
        case LOGIN_ERROR:
            return action.payload;
        default:
            return state
    }
}