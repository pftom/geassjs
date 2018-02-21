import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

let Geass = {};

function start(RootComponent) {
  // execulate init work
  ReactDOM.render(<RootComponent />, document.getElementById('root'));
  registerServiceWorker();
}

Geass.start = start;
export default Geass;