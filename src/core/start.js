import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// import redux store
import { store } from './store';

let Geass = {};

function start(RootComponent) {
  const Root = (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
  // execulate init work
  ReactDOM.render(Root, document.getElementById('root'));
  registerServiceWorker();
}

Geass.start = start;
export default Geass;