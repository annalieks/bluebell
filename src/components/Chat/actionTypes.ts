import {IAddMessage, IMessageData, IUpdateMessage} from "../../types";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const LIKE_MESSAGE = 'LIKE_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const OPEN_EDIT_MESSAGE = 'OPEN_EDIT_MESSAGE';
export const CANCEL_EDIT_MESSAGE = 'CANCEL_EDIT_MESSAGE';

interface AddMessageAction {
    type: typeof ADD_MESSAGE,
    payload: { id: string, message: IAddMessage }
}

interface UpdateMessageAction {
    type: typeof UPDATE_MESSAGE,
    payload: IUpdateMessage
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
    payload: IMessageData[]
}

interface OpenEditMessageAction {
    type: typeof OPEN_EDIT_MESSAGE,
    payload: IMessageData
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