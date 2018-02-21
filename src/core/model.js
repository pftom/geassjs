import { connect } from 'react-redux';
import React from 'react';

// store every component property
let components = [];

export function Model({
  namespace,
  template,
  mapStateToProps = () => {},
  mapDispatchToProps = () => {},
}) {
  return function innerModel(target) {
    // use decorator for render template, higher-order function
    const TargetComponent = connect(mapStateToProps, mapDispatchToProps)(template);
    target.prototype.render = () => {
      return <TargetComponent />;
    };

    // get the initialState & reducers & schedules
    const { state, reducer, schedule } = new target();
    components.push({
      namespace,
      state,
      reducer,
      schedule,
    });

    target.prototype.namespace = namespace;
  }
}