import { ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, LIKE_MESSAGE } from "./actionTypes";
import {
    IAddMessage, IUser, IMessageData, IUpdateMessage,
} from '../../types';

import service from './service'


export const addMessage = (message: IAddMessage) => ({
    type: ADD_MESSAGE,
    payload: {
        id: service.getNewId(),
        message
    }
})

export const updateMessage = (message: IUpdateMessage) => ({
    type: UPDATE_MESSAGE,
    payload: {
        message
    }
})

export const deleteMessage = (id: string) => ({
    type: DELETE_MESSAGE,
    payload: {
        id
    }
})

export const likeMessage = (id: string, isLike: boolean) => ({
    type: LIKE_MESSAGE,
    payload: {
        id,
        isLike
    }
})