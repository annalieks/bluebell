import axios from 'axios';
import {
  call, put, takeEvery, all,
} from 'redux-saga/effects';
import {
  ADD_MESSAGE,
  ADD_MESSAGE_ERROR,
  AddMessageAction, DELETE_MESSAGE,
  DELETE_MESSAGE_ERROR,
  DeleteMessageAction, LIKE_MESSAGE, LIKE_MESSAGE_ERROR,
  LikeMessageAction, LOAD_MESSAGES,
  LOAD_MESSAGES_ERROR,
  LOAD_MESSAGES_SUCCESS,
  LoadMessagesAction, UPDATE_MESSAGE,
  UPDATE_MESSAGE_ERROR, UpdateMessageAction,
} from './actionTypes';
import api from '../../shared/config/api.json';

export function* loadMessages(action: LoadMessagesAction) {
  try {
    const messages = yield call(axios.get, `${api.url}/chat`);
    yield put({ type: LOAD_MESSAGES_SUCCESS, payload: messages.data });
  } catch (error) {
    yield put({ type: LOAD_MESSAGES_ERROR });
  }
}

export function* addMessage(action: AddMessageAction) {
  try {
    yield call(axios.post, `${api.url}/chat/message`, action.payload);
    yield put({ type: LOAD_MESSAGES });
  } catch (error) {
    yield put({ type: ADD_MESSAGE_ERROR });
  }
}

export function* updateMessage(action: UpdateMessageAction) {
  try {
    yield call(axios.put, `${api.url}/chat/message`, action.payload);
    yield put({ type: LOAD_MESSAGES });
  } catch (error) {
    yield put({ type: UPDATE_MESSAGE_ERROR });
  }
}

export function* deleteMessage(action: DeleteMessageAction) {
  try {
    yield call(axios.delete, `${api.url}/chat/message/${action.payload}`);
    yield put({ type: LOAD_MESSAGES });
  } catch (error) {
    yield put({ type: DELETE_MESSAGE_ERROR });
  }
}
export function* likeMessage(action: LikeMessageAction) {
  try {
    yield call(axios.put, `${api.url}/chat/message/like`, action.payload);
    yield put({ type: LOAD_MESSAGES });
  } catch (error) {
    yield put({ type: LIKE_MESSAGE_ERROR });
  }
}

export function* watchLoadMessages() {
  yield takeEvery(LOAD_MESSAGES, loadMessages);
}
export function* watchAddMessage() {
  yield takeEvery(ADD_MESSAGE, addMessage);
}
export function* watchDeleteMessage() {
  yield takeEvery(DELETE_MESSAGE, deleteMessage);
}
export function* watchUpdateMessage() {
  yield takeEvery(UPDATE_MESSAGE, updateMessage);
}
export function* watchLikeMessage() {
  yield takeEvery(LIKE_MESSAGE, likeMessage);
}

export function* chatSagas() {
  yield all([
    watchLoadMessages(),
    watchAddMessage(),
    watchDeleteMessage(),
    watchUpdateMessage(),
    watchLikeMessage(),
  ]);
}
