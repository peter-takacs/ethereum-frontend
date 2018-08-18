import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { rootReducer } from './reducers/root';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { getMembers } from './actions/network-member-actions';
import { requestAccount } from './actions/account-actions';

import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

const store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware,
  ));
store.dispatch(requestAccount() as any);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
