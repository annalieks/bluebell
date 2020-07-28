import {
  ERROR, FETCH_USERS_SUCCESS, FetchUsersSuccessAction, UsersActionType,
} from './actionTypes';

const initialState = {
  users: [],
  isLoading: true,
  error: '',
};

export default function (state = initialState, action: UsersActionType) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return {
        users: action.payload,
        isLoading: false,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
