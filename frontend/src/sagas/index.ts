import { all } from 'redux-saga/effects';
import usersSagas from '../containers/UserList/sagas';
import userPageSagas from '../containers/UserEditor/sagas';
import routingSagas from '../containers/Routing/sagas';
import { chatSagas } from '../containers/Chat/sagas';
import messageEditorSagas from '../containers/MessageEditor/sagas';

export default function* rootSaga() {
  yield all([
    userPageSagas(),
    usersSagas(),
    routingSagas(),
    chatSagas(),
    messageEditorSagas(),
  ]);
}
