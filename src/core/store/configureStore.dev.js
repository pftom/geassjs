import { createStore, applyMiddleware, compose } from 'redux';

// import rootSaga
import { rootSaga, addSaga } from './reduxSaga';

// import rootReducer
import rootReducer from './reducer';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState, enhancers) {
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      return store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}