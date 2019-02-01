
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './routes'
import reducers from './reducers';
import Header from './components/Header';

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Routes />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
ReactDOM.render(<Root />, document.getElementById("app"))