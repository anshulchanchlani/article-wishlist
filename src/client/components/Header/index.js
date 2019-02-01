import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { loginUser } from '../../actions/authActions'


import './index.scss'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }
    renderAuthButton(){
        return  this.props.auth? <NavLink to="/logout">Logout</NavLink>:<NavLink to="/login">Login</NavLink>
    }
    renderWishlistButton(){

        return this.props.auth?<li><NavLink to="/wishlist">Wishlist  {this.props.wishlist.length}</NavLink></li> :null
    }
    render() {
        return (
            <div>
            <nav className="nav-extended">
          
           
            
            <div className="nav-wrapper black ">
            <NavLink className="brand-logo custom-brand-style" to="/">Brand</NavLink>
            <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                
                {this.props.auth?<li><NavLink to="/">Items</NavLink></li>:null}
                {this.props.wishlist?this.renderWishlistButton():null}
                <li>{this.renderAuthButton()}</li>
              </ul>
            </div>
           
          </nav>
         <ul className="sidenav" id="mobile-nav">
           
           {this.props.auth?<li><NavLink to="/">Items</NavLink></li>:null}
           {this.props.wishlist?this.renderWishlistButton():null}
           <li>{this.renderAuthButton()}</li>
         </ul>
         </div>



 


        );
    }
}

function mapStateToProps(state){

    return {auth:state.auth,wishlist:state.wishlist}
}

export default connect(mapStateToProps)(Header);