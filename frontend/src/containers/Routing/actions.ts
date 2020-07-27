import { UserLoginData } from './types';
import { LOGIN_USER } from './actionTypes';

export const loginUser = (user: UserLoginData) => ({
  type: LOGIN_USER,
  payload: {
    user,
  },
});
