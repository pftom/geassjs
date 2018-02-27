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

  const app = {
    _store: null,
    _plugin: plugin,
    use: plugin.use.bind(plugin),
    useAll: plugin.useAll.bind(plugin),  
  }

  function start() {

  }
}

const sagaMiddleware = createSagaMiddleware();

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