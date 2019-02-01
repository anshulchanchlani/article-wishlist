import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER';

export const loginUser= (username,password)=>async(dispatch,getState)=>{
    
    try{
    const res = await axios.post('/login',{username:username,password:password});
    if(res.data){
        dispatch({
            type:LOGIN_USER,
            payload:res
        })
        
    }
    }catch(error){

           if(!error.response){
               dispatch(loginError(true,'Server Error. Please try again later.'))
           }else if(error.response && error.response.status===403)
           {
            error.response.status===403?
                  dispatch(loginError(true,'Invalid Credentials'))
                    :
                  dispatch(loginError(true,'Server Error. Please try again later.'))
           }
    }
}

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = ()=> async(dispatch,getState)=>{
    const res = await axios.get('/logout');
    dispatch({
        type:LOGOUT_USER
    })
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (isError,message) =>async(dispatch,getState)=>{
    dispatch({
        type:LOGIN_ERROR,
        payload:{loginError:isError,loginMessage:message}
    })
}
