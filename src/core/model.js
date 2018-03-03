import React from 'react';
import { connect } from 'react-redux';

// import for dynamic update store reducer, saga and more...
let app = {};

function dynamicGetApp(_app) {
  console.log('dynamic');
  app = _app;
}

function Model({
  namespace,
  template,
  mapStateToProps = () => {},
}) {
  return function innerModel(target) {
    // get use for global props
    console.log('plugin', app)
    const props = app._plugin;
    
    // use decorator for render template, higher-order function
    const TargetComponent = connect(mapStateToProps)(template);
    target.prototype.render = () => {
      return <TargetComponent {...props} />;
    };

    // get the initialState & reducers & schedules
    const { state, reducer, saga } = new target();
    // app._injectModel({
    //   namespace,
    //   state,
    //   reducer,
    //   saga,
    // });

    target.prototype.namespace = namespace;
  }
}

export {
  dynamicGetApp,
  Model,
}