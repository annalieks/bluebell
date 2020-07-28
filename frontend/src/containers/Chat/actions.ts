import {
  ADD_MESSAGE,
  CANCEL_EDIT_MESSAGE,
  DELETE_MESSAGE,
  LIKE_MESSAGE,
  LOAD_MESSAGES,
  OPEN_EDIT_MESSAGE,
  UPDATE_MESSAGE,
  ChatActionType,
} from './actionTypes';
import { AddMessageData, MessageData, UpdateMessageData } from '../../types';

export const addMessage = (message: AddMessageData) : ChatActionType => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const updateMessage = (message: UpdateMessageData) : ChatActionType => ({
  type: UPDATE_MESSAGE,
  payload: message,
});

export const deleteMessage = (id: string) : ChatActionType => ({
  type: DELETE_MESSAGE,
  payload: id,
});

export const loadMessages = () : ChatActionType => ({
  type: LOAD_MESSAGES,
});

export const likeMessage = (id: string, isLike: boolean) : ChatActionType => ({
  type: LIKE_MESSAGE,
  payload: {
    id,
    isLike,
  },
});

