import { FETCH_USER } from './actionTypes';

export const fetchUser = (id: string) => ({
  type: FETCH_USER,
  payload: {
    id,
  },
});
