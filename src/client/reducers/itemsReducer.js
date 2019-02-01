import {FETCH_ITEMS_ON_SEARCH,
        IS_FETCHING_ITEMS,
        NO_ITEMS_RECEIVED,
        ITEMS_RECEIVED} 
    from '../actions/itemActions'

export default function(state=[],action){
    switch(action.type){
        case FETCH_ITEMS_ON_SEARCH:
             return Object.assign({},state,action.payload.data)
        case IS_FETCHING_ITEMS:
             return Object.assign({},state,action.payload)
        case NO_ITEMS_RECEIVED:
             return Object.assign({},state,action.payload)
        case ITEMS_RECEIVED:
             return Object.assign({},state,action.payload)
        default: return state;
    }
    
}