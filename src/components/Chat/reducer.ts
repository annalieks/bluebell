import { ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from "./actionTypes";
import {IAction, IAddPayload, isAddPayload, IState, isUpdatePayload} from "../../types";
import currentUserConfig from '../../shared/config/currentUserConfig.json'

const initialState: IState = {
    messages: [],
    editedMessageId: ''
};

export default function<T>(state = initialState, action: IAction<T>): IState {
    switch (action.type) {
        case ADD_MESSAGE: {
            if(isAddPayload(action.payload)) {
                const { id, message }: IAddPayload = action.payload;
                const messages = [
                    ...state.messages,
                    {
                    id,
                        userId: currentUserConfig.userId,
                        user: currentUserConfig.user,
                        avatar: currentUserConfig.avatar,
                        text: message.text,
                        createdAt: message.createdAt,
                        editedAt: '',
                        likeCount: 0
                    }]
                return {
                    ...state,
                    messages
                };
            }
        }
        case UPDATE_MESSAGE: {
            if(isUpdatePayload(action.payload)) {

            }
        }
        default: return state;
    }
}