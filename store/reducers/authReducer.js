import { LOGIN, CHECK_USER, LOGOUT } from "@store/actions/actionTypes";

const initialState = {
  token: null,
  user: null,
};

// Auth reducer
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_USER:
      return {
        ...state,
        ...payload,
      };

    case LOGIN:
      return {
        ...state,
        ...payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
