import React, { Component } from 'react';
class Loading extends Component {
    render() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }
}

export default Loading;