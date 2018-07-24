import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './reducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { getMembers } from './actions';
import * as asyncInitialState from 'redux-async-initial-state';
import EducatorNetworkContract from '../build/contracts/EducatorNetwork.json'
import CertificatesContract from '../build/contracts/Certificates.json'
import getWeb3 from './utils/getWeb3'

const store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware,
  ));
store.dispatch(getMembers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
