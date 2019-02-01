import axios from 'axios';
import {itemExistsInWishlist} from '../../utils'

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'; 
export const addItemToWishlist = (item) => async (dispatch, getState) => {

    if (!itemExistsInWishlist(getState().wishlist, item)) {
        dispatch(writeWishlistToServer(item))
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: item
        })
    }
}

export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const deleteFromWishlist =(item) =>async(dispatch,getState)=>{
    dispatch({
        type:DELETE_FROM_WISHLIST,
        payload:item
    })
    dispatch(deleteWishlistItemFromServer(item))
}

export const FETCH_WISHLIST_ITEMS = 'FETCH_WISHLIST_ITEMS';
export const fetchWishlistItems =() =>async(dispatch,getState)=>{
    
    const res = await axios.get('/wishlist');
    dispatch({
        type:FETCH_WISHLIST_ITEMS,
        payload:res
    })

}


export const WRITE_WISHLIST_TO_SERVER = 'WRITE_WISHLIST_TO_SERVER';
export const writeWishlistToServer =(item) =>async(dispatch,getState)=>{
      const res = await axios.post('/wishlist/add',{item:item});
}

export const DELETE_WISHLIST_ITEM_FROM_SERVER = 'DELETE_WISHLIST_ITEM_FROM_SERVER';
export const deleteWishlistItemFromServer =(item) =>async(dispatch,getState)=>{
      const res = await axios.post('/wishlist/remove',{item:item});
}


