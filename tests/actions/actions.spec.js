import * as authActions from '../../src/client/actions/authActions';
import * as itemActions from '../../src/client/actions/itemActions';
import * as wishlistActions from '../../src/client/actions/wishlistActions';
import moxios from 'moxios';
import axios from 'axios'
import {mockStore} from '../setup/mockStore'



const url = 'http://localhost:8081/login'
const username = 'anshul'
const password = 'anshul'

describe('Action Creators Tests',()=>{
  const store = mockStore();
  beforeEach(()=>{
    moxios.install(axios);
  })
  afterEach(()=>{
    moxios.uninstall(axios);
  })

  it('dispatch loginuser action',()=>{
    const expectedActions=['LOGIN_USER'];
    
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response:'anshul'
      })
    })

    return store.dispatch(authActions.loginUser(username,password)).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })
  })

  it('dispatch error message when invalid user',()=>{
    const expectedActions=['LOGIN_ERROR'];
    const store = mockStore();
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:403,
    
      })
    })

    return store.dispatch(authActions.loginUser('abc','abc')).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })

  })

  it('dispatch error message when server error',()=>{
    const expectedActions=['LOGIN_ERROR'];
    const store = mockStore();
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:403
         
      })
    })

    return store.dispatch(authActions.loginUser('abc','abc')).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })

  })

  it('dispatch logout action',()=>{
    const expectedActions=['LOGOUT_USER'];
    const store = mockStore();
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
         
      })
    })

    return store.dispatch(authActions.logoutUser()).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })

  })

  it('dispatch logout action',()=>{
    const expectedActions=['LOGOUT_USER'];
    const store = mockStore();
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response:'logout'
      })
    })

    return store.dispatch(authActions.logoutUser()).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })

  })


})

describe('Item Actions tests',()=>{

  
  beforeEach(()=>{
    moxios.install(axios);
  })
  afterEach(()=>{
    moxios.uninstall(axios);
  })
  const getState = jest.fn();
  it('Dispatch Fetch Items on Search, Is fetching items and items received',()=>{
    const expectedActions=[itemActions.IS_FETCHING_ITEMS,itemActions.FETCH_ITEMS_ON_SEARCH,itemActions.ITEMS_RECEIVED];
    const store = mockStore({items:[]});
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response:{products:[
          {
            suggestion: 'Messi Icon Jersey',
            image: 'https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1548892339839/zoom/DV1317_01_laydown.jpg?sw=60&sh=60&sm=fit',
            url: 'https://www.adidas.co.uk/messi-icon-jersey/DV1317.html',
            rating: 'empty',
            reviews: '',
            subTitle: 'Boys Football',
            isPreorder: '',
            salePrice: null,
            standardPrice: '£ 19.95'
          }]}
      })
    })

    return store.dispatch(itemActions.fetchItemsOnSearchTerm('Messi')).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })
  })

  it('Dispatch items not received',()=>{
    const expectedActions=[itemActions.IS_FETCHING_ITEMS,itemActions.FETCH_ITEMS_ON_SEARCH,itemActions.NO_ITEMS_RECEIVED];
    const store = mockStore({items:[]});
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response:{products:[
          ]}
      })
    })

    return store.dispatch(itemActions.fetchItemsOnSearchTerm('Messi')).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })
  })

})

describe('Wishlist Actions',()=>{
  beforeEach(()=>{
    moxios.install(axios);
  })
  afterEach(()=>{
    moxios.uninstall(axios);
  })
  const getState = jest.fn();
  const mockItem = {id:2,url:'def'}
  it('Dispatch ADD TO WISHLIST when Item not in wishlist',()=>{
    const expectedActions=[wishlistActions.ADD_TO_WISHLIST];
    const store = mockStore({wishlist:[{id:1,url:'abc'}]});
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response:{items:[{id:2}]}
      })
    })

    return store.dispatch(wishlistActions.addItemToWishlist(mockItem)).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })
  })

  it('Dispatch nothing when Item  in wishlist',()=>{
    const expectedActions=[];
    const store = mockStore({wishlist:[{id:2,url:'def'}]});
    moxios.wait(()=>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response:{items:[{id:2}]}
      })
    })

    return store.dispatch(wishlistActions.addItemToWishlist(mockItem)).then(()=>{
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action=>action.type);
      expect(actionTypes).toEqual(expectedActions)
    })
  })
})



