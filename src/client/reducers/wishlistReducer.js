import {ADD_TO_WISHLIST,DELETE_FROM_WISHLIST,FETCH_WISHLIST_ITEMS} from '../actions/wishlistActions'
import {deleteItemFromWishlist,itemExistsInWishlist} from '../../utils'
export default function(state=[],action){
    switch(action.type){
        case ADD_TO_WISHLIST:
             if(itemExistsInWishlist(state,action.payload))
             {
                 return [...state]
             }else{
                return [...state,action.payload];
             }
             
        case DELETE_FROM_WISHLIST:
             return deleteItemFromWishlist(state,action.payload)
        case FETCH_WISHLIST_ITEMS:
             return action.payload.data;
        default:
             return state;
    }   
}



