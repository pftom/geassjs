import {
  Model,
  Component,
} from '../../core/';

import AppView from './app.view';
import './app.style.css';

@Model({
  namespace: 'app',
  template: AppView,
  mapStateToProps: (state) => {
    const { current, record } = state.app;

    return {
      current,
      record,
    };
  },
})
export default class AppModel extends Component {
  state = {
    current: 0,
    record: 0,
  };

  saga = {
    // 让saga effects 方法触手可及
    *add({ call, put, delay }, action) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  };

  reducer = {
    // add or minus represent action name
    add(state) {
      const newCurrent = state.current + 1;

      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return {
        ...state,
        current: state.current - 1,
      };
    },
  };
}