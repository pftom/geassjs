import React from 'react';
import { connect } from 'react-redux';
import { injectModel } from './util';

function Model({
  namespace,
  template,
  mapStateToProps = () => {},
}) {
  return function innerModel(target) {
    // get use for global props
    let props = {};
    // get the initialState & reducers & schedules
    const { state, reducer, saga } = new target();

    // dynamic inject model
    injectModel({
      namespace,
      state,
      reducer,
      saga,
    });
    
    // use decorator for render template, higher-order function
    const TargetComponent = connect(mapStateToProps)(template);
    target.prototype.render = () => {
      return <TargetComponent {...props} />;
    };

    target.prototype.namespace = namespace;
  }
}

export default Model;