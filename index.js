import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import {name as appName} from './app.json';

const store = createStore(reducers, applyMiddleware(thunk));

const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )
  
  AppRegistry.registerComponent(appName, () => RNRedux);
