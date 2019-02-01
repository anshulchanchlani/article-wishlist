import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'

import { withRouter, Redirect } from 'react-router-dom'
import './index.scss'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password)

    }

    render() {

        if (this.props.auth ) {
            return <Redirect to="/" />
        }

        return (

            <form className="container form-login" onSubmit={this.onSubmit}>
                <div className="row">
                <div className="col s12 l8 offset-l2 m10 offset-m1">
                <h2>Login</h2>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="email"  name="username" type="text" className="validate" value={this.state.username} onChange={this.onChange}/>
                        <label className="login-label-style" htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 ">
                        <input id="password" type="password" className="validate" value={this.state.password} name="password" onChange={this.onChange} />
                        <label className="login-label-style" htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 ">
                        {this.props.errors && this.props.errors.loginError?<h6 className="login-error">{this.props.errors.loginMessage}</h6>:null}
                    </div>
                </div>
                
                <button className="btn waves-effect waves-light black" type="submit" onClick={this.onSubmit} name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
                </div>
                </div>
            </form>
        );
    }
}
function mapStateToProps(state) {
    return { auth:state.auth,errors:state.errors }
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login));

