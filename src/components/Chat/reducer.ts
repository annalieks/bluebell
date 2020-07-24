import {UPDATE_MESSAGE, ADD_MESSAGE, LOAD_MESSAGES, DELETE_MESSAGE, LIKE_MESSAGE, ChatActionType}
from "./actionTypes";

import currentUserConfig from '../../shared/config/currentUserConfig.json'
import {ChatState} from "../../types";

const initialState: ChatState = {
    messages: []
};

export default function(state = initialState, action: ChatActionType): ChatState {
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
            return {
                ...state,
                messages
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
            message.likeCount = likesNum == undefined ? 0 : likesNum;
            message.likeCount += message.isLike ? 1 : -1;
            return {
                ...state,
                messages
            }
        }

        default: return state;
    }
}