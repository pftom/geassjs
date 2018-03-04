import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import {
  rootReducer,
  rootSaga,
} from './util';

export default class App {
  constructor(plugin) {
    this._store = null;
    this._reducers = [];
    this._sagas = [];

    // production or development
    this._middlewares = null;
    this._enhancers = null;
    
    this._plugin = plugin;

    this.useEnhancer = plugin.useEnhancer.bind(plugin);
    this.useAllEnhancers = plugin.useAllEnhancers.bind(plugin);
    this.useMiddleware =  plugin.useMiddleware.bind(plugin);
    this.useAllMiddlewares = plugin.useAllMiddlewares.bind(plugin);
    this.useProp = plugin.useProp.bind(plugin);
    this.useAllProps = plugin.useAllProps.bind(plugin);
  }

  start = (
    RootComponent, 
    initialState = {},
  ) => {

    // if store is not created
    if (!this._store) {
      this._createStore(initialState, combineReducers(rootReducer), rootSaga);
    }

    // start rendering app
    this._render(RootComponent);
  }

  _createStore = (
    initialState = {}, 
    rootReducer, 
    rootSaga
  ) => {
    // get all applied middleware and sagas
    this._middlewares = this._plugin.get('middlewares');
    this._enhancers = this._plugin.get('enhancers');

    // construct a special middleware called: sagaMiddleware
    // before start, all other middlewares is added,
    // so, sagaMiddleware is the last middleware in this._middlewars
    const sagaMiddleware = createSagaMiddleware();
    this.useMiddleware(sagaMiddleware, 'common');

    // construct single redux store
    this._store = configureStore(
      initialState, 
      this._middlewares,
      this._enhancers,
      rootReducer,
    );

    // then run the saga 
    sagaMiddleware.run(rootSaga);
  }

  _render = (RootComponent) => {
    // jsx syntax, so should include React from 'react'
    const Root = (
      <Provider store={this._store}>
        <RootComponent />
      </Provider>
    );

    // execulate init work
    ReactDOM.render(Root, document.getElementById('root'));
    registerServiceWorker();
  }
}