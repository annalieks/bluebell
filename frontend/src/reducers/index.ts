import { combineReducers } from 'redux';
import Chat from '../containers/Chat/reducer';
import Users from '../containers/UserList/reducer';
import UserEditor from '../containers/UserEditor/reducer';
import Routing from '../containers/Routing/reducer';
import MessageEditor from '../containers/MessageEditor/reducer'

const rootReducer = combineReducers({
  chat: Chat,
  users: Users,
  user: UserEditor,
  login: Routing,
  message: MessageEditor,
});

export default rootReducer;
