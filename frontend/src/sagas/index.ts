import { all } from 'redux-saga/effects';
import usersSagas from '../containers/UserList/sagas';
import userPageSagas from '../containers/UserEditor/sagas';
import routingSagas from "../containers/Routing/sagas";

export default function* rootSaga() {
  yield all([
    userPageSagas(),
    usersSagas(),
    routingSagas(),
  ]);
}
