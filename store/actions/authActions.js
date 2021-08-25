import { LOGIN, CHECK_USER, LOGOUT } from "@store/actions/actionTypes";
import axios from "axios";
import { NEXT_URL } from "config";
import { setAlert } from "./alertActions";
import { setLoader, removeLoader } from "./loaderActions";

// Check the user
export const checkUser = () => async (dispatch) => {
  try {
    // Fetch the user
    const res = await axios.get(`${NEXT_URL}/user`);

    // Get the user data
    const user = res.data.user;

    // Dispatch the action
    dispatch({
      type: CHECK_USER,
      payload: user,
    });
  } catch (err) {
    console.log(err.response.data.message);
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
      const data = res.data;

      // Dispatch login
      dispatch({
        type: LOGIN,
        payload: data.user,
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

    let user;

    // Set the user to null if cookie is successfully removed
    {
      res.status === 200 && user === null;
    }

    // Dispatch the action
    dispatch({
      type: LOGOUT,
      payload: user,
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
