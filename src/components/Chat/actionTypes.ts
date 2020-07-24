import {IAddMessage, IMessageData, IUpdateMessage} from "../../types";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const LIKE_MESSAGE = 'LIKE_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';

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

export type ChatActionType =
    AddMessageAction
    | UpdateMessageAction
    | DeleteMessageAction
    | LikeMessageAction
    | LoadMessagesAction;