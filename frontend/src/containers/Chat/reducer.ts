import {
  ChatActionType, LOAD_MESSAGES_SUCCESS,
} from './actionTypes';

import { ChatState } from '../../types';

const initialState: ChatState = {
  messages: [],
  isLoading: true,
};

export default function (state = initialState, action: ChatActionType): ChatState {
  switch (action.type) {
    case LOAD_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload,
        isLoading: false,
      };
    }
    default: return state;
  }
}
