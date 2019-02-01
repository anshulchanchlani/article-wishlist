import axios from 'axios';
import {itemExistsInWishlist} from '../../utils'
import {API_SEARCH_ITEMS_URL} from '../constants'
export const FETCH_ITEMS_ON_SEARCH = 'FETCH_ITEMS_ON_SEARCH'
export const fetchItemsOnSearchTerm =(searchTerm)=> async(dispatch,getState)=>{
    dispatch(isFetchingItems())
    const url = `${API_SEARCH_ITEMS_URL}/${searchTerm}`;
    const res = await axios.get(url)

        dispatch( {
        type:FETCH_ITEMS_ON_SEARCH,
        payload:res
        }) 
       
        if(res.data.products.length==0){

            dispatch(noItemsReceived())
        }else{
            dispatch(itemsReceived())
        }
}

export const IS_FETCHING_ITEMS = 'IS_FETCHING_ITEMS'
export const isFetchingItems = ()=>(dispatch,getState)=>{
    if(getState().items.length===0)
    {
        dispatch( {
        type: IS_FETCHING_ITEMS,
        payload:{isFetching:true}
        })
    }
    
}

export const ITEMS_RECEIVED = 'ITEMS_RECEIVED'
export const itemsReceived = ()=>(dispatch,getState)=>{
        dispatch( {
        type: ITEMS_RECEIVED,
        payload:{isFetching:false,itemsNotReceived:false}
        })
    
}



export const NO_ITEMS_RECEIVED = 'NO_ITEMS_RECEIVED'
export const noItemsReceived = ()=>(dispatch,getState)=>{
    dispatch( {
        type: NO_ITEMS_RECEIVED,
        payload:{itemsNotReceived:true,isFetching:false}
    })
}




