import authReducer from '../../src/client/reducers/authReducer';
import errorsReducer from '../../src/client/reducers/errorsReducer';
import itemsReducer from '../../src/client/reducers/itemsReducer';
import wishlistReducer from '../../src/client/reducers/wishlistReducer';

import * as authActions from '../../src/client/actions/authActions'
import * as itemActions from '../../src/client/actions/itemActions'
import * as wishlistActions from '../../src/client/actions/wishlistActions'
const data = {
    suggestion:'abc',
    url:'abc'
}
describe('Auth Reducer Tests',()=>{
    it('Auth Reducer returns data for valid data',()=>{
        expect(authReducer(null,{type:authActions.LOGIN_USER,payload:{data:'anshul'}})).toEqual("anshul")
    })
    it('Auth Reducer returns false for invalid data',()=>{
        expect(authReducer(null,{type:authActions.LOGIN_USER,payload:{data:null}})).toEqual(false)
    })
    it('Auth Reducer returns state for invalid action',()=>{
        expect(authReducer(null,{type:'abc',payload:{data:null}})).toEqual(null)
    })

})

describe('Errors Reducer Tests',()=>{
    it('Errors reducer returns data for valid action type',()=>{
        expect(errorsReducer(null,{type:authActions.LOGIN_ERROR,payload:{isLoginError:true}})).toEqual({isLoginError:true})
    })
    it('Errors reducer returns null for invalid action type',()=>{
        expect(errorsReducer(null,{type:'some action',payload:{isLoginError:true}})).toEqual(null)
    })
})

describe('Items Reducer Tests',()=>{


    it('Returns payload for FETCH_ITEMS_ON_SEARCH',()=>{
        expect(itemsReducer([],{type:itemActions.FETCH_ITEMS_ON_SEARCH,payload:{data:data}})).toEqual(data)
    })

    it('Returns true for IS_FETCHING_ITEMS',()=>{
        expect(itemsReducer([],{type:itemActions.IS_FETCHING_ITEMS,payload:{isFetchingItems:true}})).toEqual({isFetchingItems:true})
    })
    it('Returns true for ITEMS_RECEIVED',()=>{
        expect(itemsReducer([],{type:itemActions.IS_FETCHING_ITEMS,payload:{itemsReceived:true}})).toEqual({itemsReceived:true})
    })
    it('Returns true for NO_ITEMS_RECEIVED',()=>{
        expect(itemsReducer([],{type:itemActions.IS_FETCHING_ITEMS,payload:{itemsReceived:false}})).toEqual({itemsReceived:false})
    })
    it('Returns initialstate for invalid action',()=>{
        expect(itemsReducer([],{type:'hello'})).toEqual([])
    })
})

describe('Wishlist Reducer Tests',()=>{
   
    it('ADD_TO_WISHLIST test when item does not exist in wishilist',()=>{
        expect(wishlistReducer([],{type:wishlistActions.ADD_TO_WISHLIST,payload:data})).toEqual([data])
    })
    it('ADD_TO_WISHLIST test when item exists in wishlist',()=>{
        expect(wishlistReducer([data],{type:wishlistActions.ADD_TO_WISHLIST,payload:data})).toEqual([data])
    })
    it('DELETE_FROM_WISHLIST test',()=>{
        expect(wishlistReducer([data],{type:wishlistActions.DELETE_FROM_WISHLIST,payload:data})).toEqual([])
    })

    it('FFETCH_WISHLIST_ITEMS test',()=>{
        expect(wishlistReducer([data],{type:wishlistActions.FETCH_WISHLIST_ITEMS,payload:{data:data}})).toEqual(data)
    })

    it('Invalid action returns initial state test',()=>{
        expect(wishlistReducer([],{type:'abc',payload:{data:data}})).toEqual([])
    })
})