import { combineReducers } from 'redux';
import Chat from '../containers/Chat/reducer';
import Users from '../containers/Users/reducer';
import UserPage from '../containers/UserPage/reducer';
import Routing from '../containers/Routing/reducer';

const rootReducer = combineReducers({
  chat: Chat,
  Users,
  UserPage,
  login: Routing,
});

export default rootReducer;
