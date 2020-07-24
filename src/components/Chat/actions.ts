import {ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, LIKE_MESSAGE, LOAD_MESSAGES, ChatActionType} from "./actionTypes";
import {
    IAddMessage, IMessageData, IUpdateMessage,
} from '../../types';

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