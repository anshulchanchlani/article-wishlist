import React from 'react';
import {mockStore} from '../../setup/mockStore'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {mount,shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import Login from '../../../src/client/components/Login'
import renderer from 'react-test-renderer'
const store = mockStore({wishlist:[],auth:'abc'})
describe('Login renders correctly',()=>{
    const component =  <Provider store={store}><BrowserRouter><Login auth='abc'/></BrowserRouter></Provider>
    const wrapper = shallow(component)
    it('Login renders correctly',()=>{
       
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})