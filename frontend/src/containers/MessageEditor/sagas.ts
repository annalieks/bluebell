import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

import api from '../../shared/config/api.json';
import {
  LOAD_MESSAGE, LOAD_MESSAGE_ERROR, LOAD_MESSAGE_SUCCESS, LoadMessageAction,
} from './actionTypes';

export function* loadMessage(action: LoadMessageAction) {
  try {
    const message = yield call(axios.get, `${api.url}/chat/message/${action.payload.id}`);
    yield put({ type: LOAD_MESSAGE_SUCCESS, payload: { message: message.data } });
  } catch (error) {
    yield put({ type: LOAD_MESSAGE_ERROR });
  }
}

function* watchLoadMessage() {
  yield takeEvery(LOAD_MESSAGE, loadMessage);
}

export default function* messageEditorSagas() {
  yield all([
    watchLoadMessage(),
  ]);
}
