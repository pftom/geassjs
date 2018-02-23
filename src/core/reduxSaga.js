import * as reduxSaga from 'redux-saga';
import * as reduxSagaEffects from 'redux-saga/effects';
import * as reduxSagaUtils from 'redux-saga/utils';

export function* rootSaga() {
  const { take } = reduxSagaEffects;
  yield take('HELLO_GEASS');
  console.log('Happy Hacking!');
}

// sagas array
let sagas = [];

function createStandardWatchSaga(namespace, saga) {
  const { take, call, takeEvery } = reduxSagaEffects;

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

    console.log('newWatchSaga', newWatchSaga);
    // add new watch saga into array
    newSagaArray.push(newWatchSaga);
  }

  return newSagaArray;
}

export function addSaga(newComponent) {
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
  reduxSaga,
  reduxSagaEffects,
  reduxSagaUtils,
}