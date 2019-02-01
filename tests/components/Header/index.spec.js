import React from 'react';
import {mockStore} from '../../setup/mockStore'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import Header from '../../../src/client/components/Header'
import Routes from '../../../src/client/routes'
const store = mockStore()

describe('Header renders',()=>{
    it('Header Component renders correctly',()=>{
        
        const wrapper = shallow(<Provider store={store}>
            <BrowserRouter>
                    <Header/>
                    
            </BrowserRouter>
             
        </Provider>); 
        const jsonWrapper = toJson(wrapper)
        
        expect(jsonWrapper).toMatchSnapshot();
        
    })
})