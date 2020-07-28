import { MessageData } from '../../types';

export const LOAD_MESSAGE = 'LOAD_MESSAGE';
export const LOAD_MESSAGE_SUCCESS = 'LOAD_MESSAGE_SUCCESS';
export const LOAD_MESSAGE_ERROR = 'LOAD_MESSAGE_ERROR';

export interface LoadMessageAction {
    type: typeof LOAD_MESSAGE,
    payload: {
        id: string,
    }
}

export interface LoadMessageSuccessAction {
    type: typeof LOAD_MESSAGE_SUCCESS,
    payload: {
        message: MessageData
    },
}

export type MessageActionTypes = LoadMessageSuccessAction;
