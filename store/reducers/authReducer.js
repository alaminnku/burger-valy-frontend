import { LOGIN } from "@store/actions/actionTypes";

const initialState = {
  user: {},
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default authReducer;
