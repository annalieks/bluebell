import { all } from 'redux-saga/effects';
import usersSagas from '../containers/Users/sagas';
import userPageSagas from '../containers/UserPage/sagas';
import routingSagas from "../containers/Routing/sagas";

export default function* rootSaga() {
  yield all([
    userPageSagas(),
    usersSagas(),
    routingSagas(),
  ]);
}
