import React from 'react';
import {mockStore} from '../../setup/mockStore'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Header from '../../../src/client/components/Header'
import Routes from '../../../src/client/routes'
const store = mockStore()
describe('Root renders',()=>{
    it('Root Component renders correctly',()=>{
        const wrapper = shallow(<Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Routes />
                </div>
            </BrowserRouter>
        </Provider>); 
        const jsonWrapper = toJson(wrapper)
        
        expect(jsonWrapper).toMatchSnapshot();
        
    })
})