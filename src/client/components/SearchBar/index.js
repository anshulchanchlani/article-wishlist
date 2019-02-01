import React, { Component } from 'react';

import './index.scss'
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchTerm:'' };
        this.onChange = this.onChange.bind(this);
        this.callParentHandler= this.callParentHandler.bind(this)
    }
    callParentHandler(e){
        e.preventDefault();
        if(this.state.searchTerm){
            this.props.findItems(this.state.searchTerm)
        }
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        return (
        <div className="row">
            <form className="col s12 l9 offset-l3 m10 offset-m2" onSubmit={this.callParentHandler}>
              <div className="row">
                <div className="input-field searchTermWrapper col offset-s1 s10 l8 m8 ">
                <input id="icon_suffix" placeholder="Enter search term. E.g. Stan Smith" name="searchTerm" type="text" value={this.state.searchTerm} onChange={this.onChange} className="validate"/>
                </div>
                <div>
                     <i className="material-icons suffix col s1 search-icon" onClick={this.callParentHandler}>search</i>
                </div>
              </div>
            </form>
          </div>
        );
    }
}

export default (SearchBar);