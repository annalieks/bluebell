import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import api from '../../shared/config/api.json';
import { LOGIN_USER, LOGIN_USER_ERROR, LoginUserAction } from './actionTypes';
import { UserLoginData } from './types';

export function* loginUser(action: LoginUserAction) {
  try {
    const user = yield call(axios.post, `${api.url}/login`, action.payload.user);
    yield put({
      type: 'FETCH_USERS_SUCCESS',
      payload: {
        user,
        isLoading: false,
      },
    });
  } catch (error) {
    yield put({ type: LOGIN_USER_ERROR });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginUser);
}
