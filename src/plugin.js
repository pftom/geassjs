/**
  * The global props, every component can get this props
  * The inspiration is from http://eggjs.org/
  *
  */

export default class Plugin {
  constructor() {
    this.middlewares = { prod: [], dev: [], common: [] };
    this.enhancers = { prod: [], dev: [], common: [] };
    this.sagas = [];
    this.reducers = [];
    this.props = {};
  }

  useEnhancer = (enhancer, env) => {
    this.enhancers[env].push(enhancer);
  }

  useAllEnhancers = (allEnhancers, env) => {
    this.enhancers[env].push(...allEnhancers);
  }

  useMiddleware = (middleware, env) => {
    this.middlewares[env].push(middleware);
  }

  useAllMiddlewares = (middlewares, env) => {
    this.middlewares[env].push(...middlewares);
  }

  get = (key) => {
    return this[key];
  }
}