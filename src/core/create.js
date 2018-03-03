import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { take } from 'redux-saga/effects';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { addReducer } from './reducer';
import { addSaga } from './reduxSaga';

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
    // store global reducer object, and can dynamic change
    const rootReducer = {
      // later add redux-route info
      route: (state = {}, action) => { return state; },
    };


    // initial root saga
    const rootSaga = function* () {
      yield take('HELLO_GEASS');
      console.log('Happy Hacking!');
    }

    // if store is not created
    if (!this._store) {
      this._createStore(initialState, rootReducer, rootSaga);
    }

    // start rendering app
    this._render();
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
    this._plugin.useMiddleware(sagaMiddleware, 'common');

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

  _render = () => {
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

  _injectModel = (newComponent) => {
    // if this newComponent have reducer item
    if (newComponent.reducer) {
      const newRootReducer = addReducer(newComponent);
      this._store.replaceReducer(newRootReducer)
    }
  
    // if this newComponent have saga item
    if (newComponent.saga) {
      const newRootSaga = addSaga(newComponent);
  
      const middlewares = this._middlewares;
      const sagaMiddleware = middlewares[middlewares.length - 1];
      // re-run the rootSaga
      sagaMiddleware.run(newRootSaga);
    }
  }
}