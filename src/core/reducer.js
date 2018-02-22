import { combineReducers } from 'redux';
import { dynamicInjectStore } from './store';

const initialState = {};
const reducerObj = {};

// store global reducer object, and can dynamic change
const rootReducer = {
  // later add redux-route info
  route: (state = {}, action) => { return state; },
};

function createStandardReducer(namespace = '', initialState = {}, reducer = {}) {
  return function innerStandardReducer(state = initialState, action) {
    // if reducer is empty, directly return state.
    if (Object.keys(reducer).length === 0) {
      return state;
    }

    // this var is about judge reducer action match case
    let judgeCondition = '';

    // if is not in this namespace, return state
    if (Object.keys(action).includes('name')) {
      if (action.name.namespace !== namespace) {
        return state;
      }

      judgeCondition = action['name'].value;
    } else {
      judgeCondition = action['type'];
    }

    let isCaseCompleted = false;

    for (let [actionName, reducerHandler] of Object.entries(reducer)) {
      if (judgeCondition === actionName) {
        if (typeof reducerHandler !== 'function') {
          throw new Error('reducer item must be a function.');
        }
        isCaseCompleted = true;
        console.log('state', state);
        return reducerHandler(state);
      }
    }

    // not match any actionType, return original state
    if (!isCaseCompleted) {
      return state;
    }
  }
}

export function addReducer(newComponent) {
  console.log('component', newComponent);
  const { namespace, reducer, state } = newComponent;

  // construt standard reducer function
  const standardizedReducer = createStandardReducer(namespace, state, reducer);
  reducerObj[namespace] = standardizedReducer;
  reducerObj['route'] = rootReducer.route;
  return combineReducers(reducerObj);
}


// combine all reducer to a single root reducer, and export it
export default combineReducers(rootReducer);