import React from 'react';
import {mockStore} from '../../setup/mockStore'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {mount,shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import Item from '../../../src/client/components/Item'


const store = mockStore({wishlist:[]})
const product = {
    suggestion:'abc',
    image:'abc',
    subTitle:'abc',
    salePrice:'38',
    isPreorder:"",
    rating:4,
    reviews:23
}
describe('Item renders',()=>{
    let isFavItem = jest.fn();
    const component = <Provider store={store}><Item isFav={isFavItem(product)} item={product}/></Provider>
    it('Item Component renders correctly',()=>{
        const wrapper = shallow(component)
        const jsonWrapper = toJson(wrapper);
        const testInstance = mount(component);
        
        expect(jsonWrapper).toMatchSnapshot();

    })
   
})