import 'materialize-css/dist/css/materialize.min.css'; // This is for webpack to import materialize.css
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// React-redux config
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import App from './components/App/App';
import reduxThunk from 'redux-thunk';

// import axios and assign to window in order to use it as a rest client for development api testing, this way
// we can quickly make requests having all the cookies and session data. Still postman is preferred
import axios from 'axios';
window.axios = axios;

// Create de redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
