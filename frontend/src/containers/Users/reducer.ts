import { FETCH_USERS_SUCCESS, FetchUsersSuccessAction } from './actionTypes';

const initialState = {
  users: [],
};

export default function (state = initialState, action: FetchUsersSuccessAction) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return [...action.payload];
    }

    default:
      return state;
  }
}
