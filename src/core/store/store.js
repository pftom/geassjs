import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistState } from 'redux-devtools';

// import rootSaga
import { rootSaga, addSaga } from './reduxSaga';

// import rootReducer
import rootReducer, { addReducer } from './reducer';

// import devtools
import {
  DevTools,
} from './enhancers/';

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

const store = createStore(rootReducer, compose(...enhancers));

// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
if (module.hot) {
  module.hot.accept('./reducer', () => {
    return store.replaceReducer(require('./reducer'));
  });
}

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export {
  store,
}