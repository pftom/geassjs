import { connect } from 'react-redux';
import React from 'react';

// import for dynamic update store reducer, saga and more...
import { dynamicInjectStore } from './store';

export function Model({
  namespace,
  template,
  mapStateToProps = () => {},
}) {
  return function innerModel(target) {
    // use decorator for render template, higher-order function
    const TargetComponent = connect(mapStateToProps)(template);
    target.prototype.render = () => {
      return <TargetComponent />;
    };

    // get the initialState & reducers & schedules
    const { state, reducer, saga } = new target();
    dynamicInjectStore({
      namespace,
      state,
      reducer,
      saga,
    });

    target.prototype.namespace = namespace;
  }
}