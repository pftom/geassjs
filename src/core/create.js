import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';

import registerServiceWorker from './registerServiceWorker';

// import devtools
import {
  DevTools,
} from './enhancers/';

export function create() {

  let plugin = new Plugin();
  // use and useAll for add store enhancer, middleware.
  // add and addAll for add single global props.
  // start for setup all app,
  const app = {
    _store: null,
    _reducers: null,
    _middlewares: null,
    _sagas: null,
    _plugin: plugin,
    useEnhancer: plugin.useEnhancer.bind(plugin),
    useAllEnhancer: plugin.useAllEnhancer.bind(plugin), 
    useMiddleware:  plugin.useMiddleware.bind(plugin),
    useAllMiddleware: plugin.useAllMiddleware.bind(plugin),
    addProps: plugin.addProps.bind(plugin),
    addAllProps: plugin.addAllProps.bind(plugin),
    start,
  };
  return app;

  function start() {

    // construct saga middleware
    const sagaMiddleware = createSagaMiddleware();
    
    app._middlewares = [sagaMiddleware];

  }
}

// use let for later modify it
let middlewares = [
  createLogger(),
  sagaMiddleware,
];

// use let for later modify it
let enhancers = [
  applyMiddleware(...middlewares),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
];

let Geass = {};

function start(RootComponent) {
  const Root = (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
  // execulate init work
  ReactDOM.render(Root, document.getElementById('root'));
  registerServiceWorker();
}

function dynamicInjectStore(newComponent) {
  // if this newComponent have reducer item
  if (newComponent.reducer) {
    const newRootReducer = addReducer(newComponent);
    store.replaceReducer(newRootReducer)
  }

  // if this newComponent have saga item
  if (newComponent.saga) {
    const newRootSaga = addSaga(newComponent);

    // re-run the rootSaga
    sagaMiddleware.run(newRootSaga);
  }
}

Geass.start = start;
export default Geass;