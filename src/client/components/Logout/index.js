import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {logoutUser} from '../../actions/authActions'
class Logout extends Component {
    componentDidMount(){
        this.props.logoutUser();
    }
    render() {
        return (
            <div>
            <h5>You have been logged out successfully.Please <Link to='/login'>Login</Link> again.</h5>
            </div>

        );
    }
}


export default connect(null,{logoutUser})(Logout);