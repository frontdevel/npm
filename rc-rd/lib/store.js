import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

/**
 * 创建 reducer
 * @param {array} models 
 */
const createReducer = ({models, extractReducers}) => {
  const reducers = models.reduce((accumulator, cur) => {
    accumulator[cur.name] = cur.reducer;
    return accumulator;
  }, {});

  return combineReducers({
    ...reducers,
    ...extractReducers
  });
};


/**
 * 创建 store
 *  
 */
const configureStore = ({models, dev, middleware = {}, extractReducers}) => {
  const reducer = createReducer({models, extractReducers});
  const composeEnhancers = dev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(reducer, {}, composeEnhancers(
    applyMiddleware(...middleware)
  ));
  return store;
};

export default configureStore;