import { combineReducers } from 'redux';
import Chat from '../containers/Chat/reducer';
import Users from '../containers/UserList/reducer';
import UserPage from '../containers/UserEditor/reducer';
import Routing from '../containers/Routing/reducer';

const rootReducer = combineReducers({
  chat: Chat,
  users: Users,
  user: UserPage,
  login: Routing,
});

export default rootReducer;
