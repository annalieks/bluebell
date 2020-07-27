import { AuthorizedUser, UserLoginData } from './types';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export interface LoginUserAction {
    type: typeof LOGIN_USER;
    payload: { user: UserLoginData };
}

interface LoginSuccessUserAction {
    type: typeof LOGIN_USER_SUCCESS;
    payload: {
        userData: AuthorizedUser,
        isLoading: boolean;
    };
}

export type LoginUserType = LoginUserAction | LoginSuccessUserAction;
