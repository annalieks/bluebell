import { AuthorizedUser, UserLoginData } from './types';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const START_LOADING = 'START_LOADING';

export interface LoginUserAction {
    type: typeof LOGIN_USER;
    payload: { user: UserLoginData };
}

export interface StartLoadingAction {
    type: typeof START_LOADING;
}

interface LoginSuccessUserAction {
    type: typeof LOGIN_USER_SUCCESS;
    payload: AuthorizedUser;
}

interface LoginErrorUserAction {
    type: typeof LOGIN_USER_ERROR,
}

export type LoginUserType = LoginSuccessUserAction | StartLoadingAction | LoginErrorUserAction;
