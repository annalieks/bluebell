import { LOAD_MESSAGE } from './actionTypes';

export const loadMessage = (id: string) => ({
  type: LOAD_MESSAGE,
  payload: {
    id,
  },
});
