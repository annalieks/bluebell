import { FETCH_USERS_SUCCESS, FetchUsersSuccessAction } from './actionTypes';

export default function (state = [], action: FetchUsersSuccessAction) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return [...action.payload];
    }

    default:
      return state;
  }
}
