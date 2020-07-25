import { combineReducers } from 'redux';
import Chat from '../components/Chat/reducer';

const rootReducer = combineReducers({
  chat: Chat,
});

export default rootReducer;
