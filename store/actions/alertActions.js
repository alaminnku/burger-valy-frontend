import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (message, type) => (dispatch) => {
  const id = uuidv4();

  // Set the alert
  dispatch({
    type: SET_ALERT,
    payload: { message, type, id },
  });

  // Remove the alert after 5 seconds
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    4000
  );
};
