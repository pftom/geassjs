import { Model } from './model';
import {
  reduxSaga,
  reduxSagaEffects,
  reduxSagaUtils,
} from './reduxSaga';

// 全局props，每个component都能读取到这个props，一次导入，处处使用
const props = {
  // redux-saga api
  ...reduxSaga,
  ...reduxSagaEffects,
  ...reduxSagaUtils,
};


export default Model;
export {
  props,
}