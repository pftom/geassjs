import * as reduxSaga from 'redux-saga';
import * as reduxSagaEffects from 'redux-saga/effects';
import * as reduxSagaUtils from 'redux-saga/utils';
import { combineReducers } from 'redux';

// dynamic construct rootReducer
const reducerObj = {};

// dynamic construct sagas
let sagas = [];

function createStandardReducer(namespace = '', initialState = {}, reducer = {}) {
  return function innerStandardReducer(state = initialState, action) {
    // if reducer is empty, directly return state.
    if (Object.keys(reducer).length === 0) {
      return state;
    }

    let isCaseCompleted = false;

    for (let [actionName, reducerHandler] of Object.entries(reducer)) {
      // this var is about judge reducer action match case
      let judgeCondition = '';
  
      // 将action: namespace/actionName, 分离，进行判断
      const splitedToNamespaceAndAction = action.type.split('/');
      // if is not in this namespace, return state
      if (splitedToNamespaceAndAction.length === 2) {
        if (splitedToNamespaceAndAction[0] !== namespace) {
          return state;
        }
  
        judgeCondition = splitedToNamespaceAndAction[1];
      } else {
        judgeCondition = action.type;
      }

      if (judgeCondition === actionName) {
        if (typeof reducerHandler !== 'function') {
          throw new Error('reducer item must be a function.');
        }
        isCaseCompleted = true;
        return reducerHandler(state);
      }
    }

    // not match any actionType, return original state
    if (!isCaseCompleted) {
      return state;
    }
  }
}

function addReducer(newComponent) {
  const { namespace, reducer, state } = newComponent;

  // construt standard reducer function
  const standardizedReducer = createStandardReducer(namespace, state, reducer);
  reducerObj[namespace] = standardizedReducer;
  return combineReducers(reducerObj);
}

function createStandardWatchSaga(namespace, saga) {
  const { takeEvery } = reduxSagaEffects;

  // judge empty
  if (!saga || Object.keys(saga).length === 0) {
    return [];
  }

  let newSagaArray = [];

  for (let [actionName, sagaHandler] of Object.entries(saga)) {
    // create standard watch saga
    const newWatchSaga = function* innerNewWatchSaga () {
      yield takeEvery(
        `${namespace}/${actionName}`, 
        sagaHandler, 
        { ...reduxSaga, ...reduxSagaEffects, ...reduxSagaUtils},
      );
    }

    // add new watch saga into array
    newSagaArray.push(newWatchSaga);
  }

  return newSagaArray;
}

function addSaga(newComponent) {
  const { saga, namespace } = newComponent;
  const { all } = reduxSagaEffects;

  // construct standard watch saga and contact with work saga
  const standardizedWatchSagas = createStandardWatchSaga(namespace, saga);

  // spread standardizedWatchSagas and execulate every watch saga
  sagas.push(...standardizedWatchSagas);

  return function* innerAddSaga() {
    yield all(sagas.map(singleSaga => singleSaga()));
  }
}

export {
  addReducer,

  reduxSaga,
  reduxSagaEffects,
  reduxSagaUtils,

  addSaga,
}