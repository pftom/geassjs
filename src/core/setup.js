import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';

import App from './create';
import Plugin from './plugin';
import {
  DevTools,
} from './enhancers/';

export default function Create() {
  // create plugin instance
  const plugin = new Plugin();

  // instantation app 
  const app = new App(plugin);

  // is app existence, export app for injectModel use
  if (app) {
    exports.app = app;
  }

  // add this framework default enhancers
  app.useAllEnhancers(
    [
      DevTools.instrument(),
      persistState(getDebugSessionKey()),
    ],
    'dev',
  );

  // add this framework default middlewares
  app.useAllMiddlewares(
    [
      createLogger(),
    ],
    'dev',
  );

  // add this framework default props
  app.useAllProps([]);

  // return app instance
  return app;
}

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}