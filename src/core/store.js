import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// import rootSaga
import { rootSaga, addSaga } from './reduxSaga';
import rootReducer, { addReducer } from './reducer';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [
  createLogger(),
  sagaMiddleware,
];

export let store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export function dynamicInjectStore(newComponent) {
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