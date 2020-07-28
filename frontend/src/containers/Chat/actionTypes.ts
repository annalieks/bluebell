import { AddMessageData, MessageData, UpdateMessageData } from '../../types';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGE_ERROR = 'ADD_MESSAGE_ERROR';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const UPDATE_MESSAGE_ERROR = 'UPDATE_MESSAGE_ERROR';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_MESSAGE_ERROR = 'DELETE_MESSAGE_ERROR';
export const LIKE_MESSAGE = 'LIKE_MESSAGE';
export const LIKE_MESSAGE_ERROR = 'LIKE_MESSAGE_ERROR';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const OPEN_EDIT_MESSAGE = 'OPEN_EDIT_MESSAGE';
export const CANCEL_EDIT_MESSAGE = 'CANCEL_EDIT_MESSAGE';
export const LOAD_MESSAGES_ERROR = 'LOAD_MESSAGES_ERROR';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';

export interface AddMessageAction {
    type: typeof ADD_MESSAGE,
    payload: AddMessageData,
}

export interface UpdateMessageAction {
    type: typeof UPDATE_MESSAGE,
    payload: UpdateMessageData
}

export interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE,
    payload: string
}

export interface LikeMessageAction {
    type: typeof LIKE_MESSAGE,
    payload: {
        id: string,
        isLike: boolean
    }
}

export interface LoadMessagesSuccessAction {
    type: typeof LOAD_MESSAGES_SUCCESS,
    payload: MessageData[],
}

export interface LoadMessagesErrorAction {
    type: typeof LOAD_MESSAGES_ERROR
}

export interface LoadMessagesAction {
    type: typeof LOAD_MESSAGES,
}

export type ChatActionType = LoadMessagesSuccessAction | LoadMessagesErrorAction | AddMessageAction
    | UpdateMessageAction | DeleteMessageAction | LoadMessagesAction | LikeMessageAction;
