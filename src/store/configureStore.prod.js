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

  return store;
}