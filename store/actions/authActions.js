import { LOGIN, CHECK_USER, LOGOUT } from "@store/actions/actionTypes";
import axios from "axios";
import { NEXT_URL } from "config";
import { setAlert } from "./alertActions";
import { setLoader, removeLoader } from "./loaderActions";

// Check the user
export const checkUser = () => async (dispatch) => {
  try {
    // Fetch the token
    const res = await axios.get(`${NEXT_URL}/user`);

    // Get the token
    const token = res.data.token;
    const user = res.data.user;

    // Dispatch the action
    dispatch({
      type: CHECK_USER,
      payload: { token, user },
    });
  } catch (err) {
    console.log(err);
  }
};

// Login action
export const login =
  ({ email: identifier, password }) =>
  async (dispatch) => {
    const details = { identifier, password };

    try {
      // Start the loader
      dispatch(setLoader(true));

      // Post the details
      const res = await axios.post(`${NEXT_URL}/login`, details);

      // Get the response
      const token = res.data.token;
      const user = res.data.user;

      // Dispatch login
      dispatch({
        type: LOGIN,
        payload: { token, user },
      });

      // Set the loader and show the message
      dispatch(removeLoader(false));
      dispatch(setAlert("Successfully logged in!", "Success"));
    } catch (err) {
      // Remove the loader and show the message
      dispatch(removeLoader(false));
      dispatch(setAlert(`${err.response.data.message}!`, "Danger"));
    }
  };

//Logout action
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    // Post the logout request
    const res = await axios.post(`${NEXT_URL}/logout`);

    let token;

    // Set the token to null if cookie is successfully removed
    {
      res.status === 200 && token === null;
    }

    // Dispatch the action
    dispatch({
      type: LOGOUT,
      payload: token,
    });

    // Show the message
    dispatch(setAlert("Successfully logged out!", "Success"));
    dispatch(removeLoader(false));
  } catch (err) {
    // Show the message
    dispatch(setAlert(err.response.data.message, "Danger"));
    dispatch(removeLoader(false));
  }
};
