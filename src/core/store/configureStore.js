
export default function wrapExport(
  initialState, 
  middlewares, 
  enhancers,
  rootReducer,
) {
  let store = null;
  if (process.env.NODE_ENV === 'production') {
    const configureStore = require('./configureStore.prod').default;
    store = configureStore(
      initialState, 
      [...middlewares['prod'], ...middlewares['common']], 
      [...enhancers['prod'], ...enhancers['common']],
      rootReducer,
    );
  } else {
    const configureStore = require('./configureStore.dev').default;
    store = configureStore(
      initialState, 
      [...middlewares['dev'], ...middlewares['common']], 
      [...enhancers['dev'], ...enhancers['common']],
      rootReducer,
    );
  }

  return store;
}