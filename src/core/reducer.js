import { combineReducers } from 'redux';
import { dynamicInjectStore } from './store';

const reducerObj = {};

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
  reducerObj['route'] = rootReducer.route;
  return combineReducers(reducerObj);
}

export {
  addReducer,
}