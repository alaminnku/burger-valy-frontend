import { SET_LOADER, REMOVE_LOADER } from "../actions/actionTypes";

const initialState = {
  loading: false,
};

const loaderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADER:
      return {
        ...state,
        loading: payload,
      };

    case REMOVE_LOADER:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};

export default loaderReducer;
