import { UserLoginData } from './types';
import { LOGIN_USER, START_LOADING } from './actionTypes';

export const loginUser = (user: UserLoginData) => ({
  type: LOGIN_USER,
  payload: {
    user,
  },
});

export const startLoading = () => ({
  type: START_LOADING,
});
