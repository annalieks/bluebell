import {
    ADD_MESSAGE,
    CANCEL_EDIT_MESSAGE,
    ChatActionType,
    DELETE_MESSAGE,
    LIKE_MESSAGE,
    LOAD_MESSAGES,
    OPEN_EDIT_MESSAGE,
    UPDATE_MESSAGE
} from "./actionTypes";

import currentUserConfig from '../../shared/config/currentUserConfig.json'
import {ChatState} from "../../types";
import _ from "lodash";

const initialState: ChatState = {
    messages: [],
    editMessage: undefined
};

export default function(state = initialState, action: ChatActionType): ChatState {
    console.log(action);
    switch (action.type) {
        case ADD_MESSAGE: {
            const { id, message } = action.payload;
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id,
                        ...message,
                        userId: currentUserConfig.userId,
                        user: currentUserConfig.user,
                        avatar: currentUserConfig.avatar,
                        editedAt: '',
                        likeCount: 0
                    }
                ]
            };
        }
        case UPDATE_MESSAGE: {
            const messages = [...state.messages];
            const message = action.payload;
            const updatedPos = messages.findIndex(m => m.id === message.id);
            messages[updatedPos].text = message.text;
            messages[updatedPos].editedAt = Date.now().toString();
            console.log(messages[updatedPos]);
            return {
                ...state,
                messages: _.cloneDeep(messages),
                editMessage: undefined
            }

        }
        case LOAD_MESSAGES: {
            const messages = action.payload;
            return {
                ...state,
                messages: [...state.messages, ...messages]
            }
        }
        case DELETE_MESSAGE: {
            const id = action.payload;
            const messages = [...state.messages].filter(m => m.id !== id);
            return {
                ...state,
                messages
            }
        }
        case LIKE_MESSAGE: {
            const id  = action.payload;
            const messages = [...state.messages];
            const updatedPos = messages.findIndex(m => m.id === id);
            const message = messages[updatedPos], likesNum = message.likeCount;
            message.isLike = !message.isLike;
            message.likeCount = likesNum === undefined ? 0 : likesNum;
            message.likeCount += message.isLike ? 1 : -1;
            console.log(messages);
            return {
                ...state,
                messages: _.cloneDeep(messages)
            }
        }
        case OPEN_EDIT_MESSAGE: {
            return {
                ...state,
                editMessage: action.payload
            }
        }

        case CANCEL_EDIT_MESSAGE: {
            return {
                ...state,
                editMessage: undefined
            }
        }

        default: return state;
    }
}