import * as reduxSaga from 'redux-saga';
import * as reduxSagaEffects from 'redux-saga/effects';
import * as reduxSagaUtils from 'redux-saga/utils';

// sagas array
let sagas = [];

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
  reduxSaga,
  reduxSagaEffects,
  reduxSagaUtils,

  addSaga,
}