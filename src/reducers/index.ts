import { combineReducers } from 'redux';
import Chat from '../components/Chat/reducer'
import EditModal from "../components/EditModal/reducer";

const rootReducer = combineReducers({
    chat: Chat,
    edit: EditModal
});

export default rootReducer;