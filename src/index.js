import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import phrase from './reducers/phrase';
import * as serviceWorker from './serviceWorker';

WebFont.load({
    google: {
        families: ['Roboto:300,400,700', 'sans-serif']
    }
});

const hangmanApp = combineReducers({
    phrase
});

const preState = {}

const store = createStore(
    hangmanApp,
    preState,
    applyMiddleware(
        thunkMiddleware
    )
)

window.store = store;

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
