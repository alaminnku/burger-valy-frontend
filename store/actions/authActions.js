import { LOGIN, REGISTER, CHECK_USER } from "@store/actions/actionTypes";
import axios from "axios";
import { NEXT_URL } from "config";

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
