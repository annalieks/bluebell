import _ from 'lodash';
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

import { ChatState } from '../../types';
import currentUserConfig from '../../shared/config/currentUserConfig.json';

const initialState: ChatState = {
  messages: [],
  editingMessage: undefined,
};

export default function (state = initialState, action: ChatActionType): ChatState {
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
            likeCount: 0,
          },
        ],
      };
    }
    case UPDATE_MESSAGE: {
      const messages = [...state.messages];
      const message = action.payload;
      const updatedPos = messages.findIndex((m) => m.id === message.id);
      messages[updatedPos].text = message.text;
      messages[updatedPos].editedAt = message.editedAt;
      return {
        ...state,
        messages: _.cloneDeep(messages),
        editingMessage: undefined,
      };
    }
    case LOAD_MESSAGES: {
      const messages = action.payload;
      return {
        ...state,
        messages: [...state.messages, ...messages],
      };
    }
    case DELETE_MESSAGE: {
      const id = action.payload;
      const messages = [...state.messages].filter((m) => m.id !== id);
      return {
        ...state,
        messages,
      };
    }
    case LIKE_MESSAGE: {
      const id = action.payload;
      const messages = [...state.messages];
      const updatedPos = messages.findIndex((m) => m.id === id);
      const message = messages[updatedPos]; const
        likesNum = message.likeCount;
      message.isLike = !message.isLike;
      message.likeCount = likesNum === undefined ? 0 : likesNum;
      message.likeCount += message.isLike ? 1 : -1;
      return {
        ...state,
        messages: _.cloneDeep(messages),
      };
    }
    case OPEN_EDIT_MESSAGE: {
      return {
        ...state,
        editingMessage: action.payload,
      };
    }

    case CANCEL_EDIT_MESSAGE: {
      return {
        ...state,
        editingMessage: undefined,
      };
    }

    default: return state;
  }
}
