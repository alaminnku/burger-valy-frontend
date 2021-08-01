import {
  LOGIN,
  REGISTER,
  CHECK_USER,
  LOGOUT,
} from "@store/actions/actionTypes";
import axios from "axios";
import { NEXT_URL } from "config";

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
    console.log(err);
  }
};

// Register action
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const details = { name, email, password };

    try {
      // Post the details
      const res = await axios.post(`${NEXT_URL}/register`, details);

      // Get the response
      const data = res.data;

      // Dispatch register
      dispatch({
        type: REGISTER,
        payload: data.user,
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
      // Post the details
      const res = await axios.post(`${NEXT_URL}/login`, details);

      // Get the response
      const data = res.data;

      // Dispatch login
      dispatch({
        type: LOGIN,
        payload: data.user,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

//Logout action
export const logout = () => async (dispatch) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};
