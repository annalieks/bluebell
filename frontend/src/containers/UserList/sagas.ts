import axios from 'axios';
import {
  call, put, takeEvery, all,
} from 'redux-saga/effects';
import api from '../../shared/config/api.json';
import {
  ADD_USER, UPDATE_USER, DELETE_USER, FETCH_USERS,
  AddUserAction, UpdateUserAction, DeleteUserAction, FETCH_USERS_SUCCESS, ERROR,
} from './actionTypes';

export function* fetchUsers() {
  try {
    const users = yield call(axios.get, `${api.url}/users`);
    yield put({ type: FETCH_USERS_SUCCESS, payload: users.data });
  } catch (error) {
    yield put({ type: ERROR, payload: error.message });
  }
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsers);
}

export function* addUser(action: AddUserAction) {
  const newUser = { ...action.payload.data };

  try {
    yield call(axios.post, `${api.url}/user`, newUser);
    yield put({ type: FETCH_USERS });
  } catch (error) {
    yield put({ type: ERROR, payload: error.message });
  }
}

function* watchAddUser() {
  yield takeEvery(ADD_USER, addUser);
}

export function* updateUser(action: UpdateUserAction) {
  const { id } = action.payload;
  const updatedUser = { ...action.payload.data };

  try {
    yield call(axios.put, `${api.url}/user/${id}`, updatedUser);
    yield put({ type: FETCH_USERS });
  } catch (error) {
    yield put({ type: ERROR, payload: error.message });
  }
}

function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUser);
}

export function* deleteUser(action: DeleteUserAction) {
  try {
    yield call(axios.delete, `${api.url}/user/${action.payload.id}`);
    yield put({ type: FETCH_USERS });
  } catch (error) {
    yield put({ type: ERROR, payload: error.message });
  }
}

function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, deleteUser);
}

export default function* usersSagas() {
  yield all([
    watchFetchUsers(),
    watchAddUser(),
    watchUpdateUser(),
    watchDeleteUser(),
  ]);
}
