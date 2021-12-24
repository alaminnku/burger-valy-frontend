import { SET_ALERT, REMOVE_ALERT } from "@store/actions/actionTypes";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // Update the state
      return [...state, payload];

    case REMOVE_ALERT:
      // Remove the alert by id
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
};

export default alertReducer;
