const redux = require('redux');
const reducers = require('../reducers');
import createLogger from 'redux-logger';

const logger = createLogger();
module.exports = function(initialState) {
  const store = redux.createStore(reducers, initialState, redux.applyMiddleware(logger))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}