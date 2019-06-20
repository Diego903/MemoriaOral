import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { CookiesProvider } from 'react-cookie';
import HandleAuthCookie from '../handles/handleAuthCookie';
import Routes from '../routes/routes';

import { Provider } from 'react-redux';
import store from '../redux/store';

export default class App extends Component {
    constructor(props)
    {
        super(props);
    }

    render() 
    {
        return (
            <Provider store={store}>
                <CookiesProvider>
                    <HandleAuthCookie store={store}/>
                    <Routes store={store}/>
                </CookiesProvider>
            </Provider>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
