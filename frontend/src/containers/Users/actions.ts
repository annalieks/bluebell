import {
  ADD_USER, UPDATE_USER, DELETE_USER, FETCH_USERS,
} from './actionTypes';
import service from './service';
import { UserProfileData } from '../../types';

export const addUser = (data: UserProfileData) => ({
  type: ADD_USER,
  payload: {
    id: service.getNewId(),
    data,
  },
});

export const updateUser = (id: string, data: UserProfileData) => ({
  type: UPDATE_USER,
  payload: {
    id,
    data,
  },
});

export const deleteUser = (id: string) => ({
  type: DELETE_USER,
  payload: {
    id,
  },
});

export const fetchUsers = () => ({
  type: FETCH_USERS,
});
