import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer, { addReducer } from './reducer';

let middlewares = [createLogger()];

export let store = createStore(rootReducer, applyMiddleware(...middlewares));

export function dynamicInjectStore(newComponent) {
  if (newComponent.reducer) {
    const newRootReducer = addReducer(newComponent);
    store.replaceReducer(newRootReducer)
  }
}