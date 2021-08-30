import Cookies from "js-cookie";
import { SET_ITEM } from "./actionTypes";

export const setItem = () => {
  const item = Cookies.getJSON("item");

  return {
    type: SET_ITEM,
    payload: item,
  };
};
