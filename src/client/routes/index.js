import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Items from '../components/ItemsContainer';
import Wishlist from '../components/Wishlist'
import Login from '../components/Login'
import Logout from '../components/Logout'

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Route path="/" exact component={Items}/>
                <Route path="/wishlist" exact component={Wishlist}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/logout" exact component={Logout}/>
                
            </div>
        );
    }
}

export default Routes;