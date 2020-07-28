import { FETCH_USERS_SUCCESS, FetchUsersSuccessAction } from './actionTypes';

const initialState = {
  users: [],
  isLoading: true,
};

export default function (state = initialState, action: FetchUsersSuccessAction) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return {
        users: action.payload,
        isLoading: false,
      }
    }

    default:
      return state;
  }
}
