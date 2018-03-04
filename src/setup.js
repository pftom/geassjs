import App from './create';
import Plugin from './plugin';
import defaultEnhancers from './enhancers/';
import defaultMiddlewares from './middlewares/';

export let appInstance = null;

export default function setup() {
  // create plugin instance
  const plugin = new Plugin();

  // instantation app 
  const app = new App(plugin);

  // is app existence, export app for injectModel use
  if (app) {
    appInstance = app;
  }

  // add this framework default enhancers
  app.useAllEnhancers(defaultEnhancers, 'dev');

  // add this framework default middlewares
  app.useAllMiddlewares(defaultMiddlewares, 'dev');

  // return app instance
  return app;
}