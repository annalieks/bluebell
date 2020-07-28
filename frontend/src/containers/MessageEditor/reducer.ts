import { LOAD_MESSAGE_SUCCESS, MessageActionTypes } from './actionTypes';

const initialState = {
  message: {},
};

export default function (state = initialState, action: MessageActionTypes) {
  switch (action.type) {
    case LOAD_MESSAGE_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
      };
    }
    default: return state;
  }
}
