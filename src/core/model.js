import { connect } from 'react-redux';
import React from 'react';

// import for dynamic update store reducer, saga and more...
import { app } from './setup';

export function Model({
  namespace,
  template,
  mapStateToProps = () => {},
}) {
  return function innerModel(target) {
    // get use for global props
    const props = app._plugin.get('props');
    
    // use decorator for render template, higher-order function
    const TargetComponent = connect(mapStateToProps)(template);
    target.prototype.render = () => {
      return <TargetComponent {...props} />;
    };

    // get the initialState & reducers & schedules
    const { state, reducer, saga } = new target();
    app._injectModel({
      namespace,
      state,
      reducer,
      saga,
    });

    target.prototype.namespace = namespace;
  }
}