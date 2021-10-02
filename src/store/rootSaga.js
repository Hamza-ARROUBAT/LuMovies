import { all, takeLatest } from '@redux-saga/core/effects';
import { apiCall } from 'api/apiCall';
import { FETCH_MOVIES } from './reducers/movies/movies.types';

function* rootSaga() {
  // movies
  yield all([takeLatest(FETCH_MOVIES, apiCall)]);

}

export default rootSaga;
