import { createStore, applyMiddleware, compose } from 'redux';

export default function configureStore(
  initialState, 
  middlewares,
  enhancers,
  rootReducer,
) {
  const store = createStore(
    rootReducer, 
    initialState, 
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    ),
  );

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      return store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}