import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './rootSaga';

// config middlewares
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// create the store
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middlewares)
);

// register sagas
sagaMiddleware.run(rootSaga);

export default store;
