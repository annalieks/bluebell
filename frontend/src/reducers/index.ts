import { combineReducers } from 'redux';
import Chat from '../containers/Chat/reducer';
import Users from '../containers/Users/reducer';
import UserPage from '../containers/UserPage/reducer';

const rootReducer = combineReducers({
  chat: Chat,
  Users,
  UserPage,
});

export default rootReducer;
