import { FETCH_USER_SUCCESS, UserPageActionType } from './actionTypes';

const initialState = {
  user: {},
};

export default function (state = initialState, action: UserPageActionType) {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }

    default:
      return state;
  }
}
