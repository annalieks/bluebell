import { User } from '../../types';
import { LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LoginUserType } from './actionTypes';
import { AuthorizedUser } from './types';

const initialState = {
  isLoading: true,
  user: {} as AuthorizedUser,
};

export default function (state = initialState, action: LoginUserType) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
}
