import {User, UserProfileData} from '../../types';

export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export interface AddUserAction {
    type: typeof ADD_USER;
    payload: { id: string, data: UserProfileData };
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: { id: string, data: UserProfileData };
}

export interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: { id: string };
}

export interface FetchUsersSuccessAction {
    type: typeof FETCH_USERS_SUCCESS;
    payload: User[];
}

export type UsersActionType = AddUserAction | UpdateUserAction | DeleteUserAction;
