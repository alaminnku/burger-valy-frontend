import {
  LOGIN,
  REGISTER,
  CHECK_USER,
  LOGOUT,
} from "@store/actions/actionTypes";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_USER:
      return {
        ...state,
        user: payload,
      };

    case REGISTER:
      return {
        ...state,
        user: payload,
      };

    case LOGIN:
      return {
        ...state,
        user: payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
