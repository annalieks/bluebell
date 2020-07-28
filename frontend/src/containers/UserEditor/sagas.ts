import axios from 'axios';
import {
  call, put, takeEvery, all,
} from 'redux-saga/effects';
import api from '../../shared/config/api.json';
import {
  FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, FetchUserAction,
} from './actionTypes';

export function* fetchUser(action: FetchUserAction) {
  try {
    const user = yield call(axios.get, `${api.url}/user/${action.payload.id}`);
    yield put({ type: FETCH_USER_SUCCESS, payload: { user: user.data } });
  } catch (error) {
    yield put({ type: FETCH_USER_ERROR });
  }
}

function* watchFetchUser() {
  yield takeEvery(FETCH_USER, fetchUser);
}

export default function* userPageSagas() {
  yield all([
    watchFetchUser(),
  ]);
}
