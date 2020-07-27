import { AddMessageData, MessageData, UpdateMessageData } from '../../types';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const LIKE_MESSAGE = 'LIKE_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const OPEN_EDIT_MESSAGE = 'OPEN_EDIT_MESSAGE';
export const CANCEL_EDIT_MESSAGE = 'CANCEL_EDIT_MESSAGE';

interface AddMessageAction {
    type: typeof ADD_MESSAGE,
    payload: { id: string, message: AddMessageData }
}

interface UpdateMessageAction {
    type: typeof UPDATE_MESSAGE,
    payload: UpdateMessageData
}

interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE,
    payload: string
}

interface LikeMessageAction {
    type: typeof LIKE_MESSAGE,
    payload: string
}

interface LoadMessagesAction {
    type: typeof LOAD_MESSAGES,
    payload: MessageData[]
}

interface OpenEditMessageAction {
    type: typeof OPEN_EDIT_MESSAGE,
    payload: MessageData
}

interface CancelEditMessageAction {
    type: typeof CANCEL_EDIT_MESSAGE
}

export type ChatActionType =
    AddMessageAction
    | UpdateMessageAction
    | DeleteMessageAction
    | LikeMessageAction
    | LoadMessagesAction
    | OpenEditMessageAction
    | CancelEditMessageAction;
