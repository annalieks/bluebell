import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import api from '../../shared/config/api.json';
import {
  LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LoginUserAction,
} from './actionTypes';

export function* loginUser(action: LoginUserAction) {
  try {
    const user = yield call(axios.post, `${api.url}/login`, action.payload.user);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: user.data,
    });
  } catch (error) {
    yield put({ type: LOGIN_USER_ERROR });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export default function* routingSagas() {
  yield all([
    watchLoginUser(),
  ]);
}
