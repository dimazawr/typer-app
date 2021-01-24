import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css';
import App from './App';

import { rootReducer } from './redux/rootReducer';
import { socketMiddleware } from './redux/socketMiddleware';

const ENDPOINT = 'http://localhost:5000';//`https://chat-typer-app.herokuapp.com`;


const store = createStore(rootReducer,compose(
  applyMiddleware(socketMiddleware(ENDPOINT)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

