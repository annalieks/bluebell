import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LoginUserType, START_LOADING} from './actionTypes';
import { AuthorizedUser } from './types';

const initialState = {
  isAuthorized: false,
  user: {} as AuthorizedUser,
  isLoading: false,
  error: '',
};

export default function (state = initialState, action: LoginUserType) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS: {
      return {
        user: action.payload,
        isAuthorized: true,
      };
    }

    case LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Invalid username or password',
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}
