import { LOGIN } from "@store/actions/actionTypes";
import axios from "axios";
import { NEXT_URL } from "config";

export const login =
  ({ email: identifier, password }) =>
  async (dispatch) => {
    const data = { identifier, password };
    const res = await axios.post(`${NEXT_URL}/login`, data);
    const user = res.data.user;

    // Check if the login is successful
    if (user) {
      dispatch({
        type: LOGIN,
        payload: user,
      });
    } else {
      // If unsuccessful
      console.log(res.data);
    }
  };
