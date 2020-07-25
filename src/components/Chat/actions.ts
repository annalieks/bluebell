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
import {IAddMessage, IMessageData, IUpdateMessage,} from '../../types';

import service from './service'


export const addMessage = (message: IAddMessage) : ChatActionType => ({
    type: ADD_MESSAGE,
    payload: {
        id: service.getNewId(),
        message
    }
})

export const updateMessage = (message: IUpdateMessage) : ChatActionType => ({
    type: UPDATE_MESSAGE,
    payload: message
})

export const deleteMessage = (id: string) : ChatActionType => ({
    type: DELETE_MESSAGE,
    payload: id
})

export const likeMessage = (id: string) : ChatActionType => ({
    type: LIKE_MESSAGE,
    payload: id
})

export const loadMessages = (messages: IMessageData[]) : ChatActionType => ({
    type: LOAD_MESSAGES,
    payload: messages
})

export const openEditMessage = (message: IMessageData) : ChatActionType => ({
    type: OPEN_EDIT_MESSAGE,
    payload: message
})

export const cancelEditMessage = () : ChatActionType => ({
    type: CANCEL_EDIT_MESSAGE
})