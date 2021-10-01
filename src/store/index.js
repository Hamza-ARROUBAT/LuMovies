import { combineReducers, createStore } from 'redux';
import reducers from './reducers';

// create the store
const store = createStore(combineReducers(reducers));

export default store;