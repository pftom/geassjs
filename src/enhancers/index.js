import DevTools from './DevTools';
import { persistState } from 'redux-devtools';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

let enhancers = [];
enhancers.push(
  ...[
    DevTools.instrument(),
    persistState(getDebugSessionKey()),
  ],
);

export default enhancers;