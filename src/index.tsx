import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { rootReducer } from './reducers/root';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { getMembers } from './actions/network-member-actions';
import { requestAccount } from './actions/account-actions';

const store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware,
  ));
store.dispatch(requestAccount() as any);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
