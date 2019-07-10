import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { CookiesProvider } from 'react-cookie';
import HandleAuthCookie from '../handles/handleAuthCookie';
import Routes from '../routes/routes';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from '../redux/store';
import { actLogout } from '../redux/app/actions';



export default class App extends Component {
    constructor(props)
    {
        super(props);

        //se interceptan todas las peticiones http realizadas
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            return response;
          }, function (error) {
            //si el error retornado es de un usuario no autorizado
            //se cierra la sesión
            if(error.response && error.response.status == 401)
                store.dispatch(actLogout());
            
            return Promise.reject(error);            
          });
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
