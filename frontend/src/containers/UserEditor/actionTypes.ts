import { User } from '../../types';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export interface FetchUserAction {
    type: typeof FETCH_USER;
    payload: { id: string };
}

interface FetchUserSuccessAction {
    type: typeof FETCH_USER_SUCCESS;
    payload: {
        user: User,
    };
}

interface FetchUserErrorAction {
    type: typeof FETCH_USER_ERROR;
}

export type UserPageActionType = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction;
