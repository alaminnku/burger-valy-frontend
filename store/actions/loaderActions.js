import { SET_LOADER, REMOVE_LOADER } from "./actionTypes";

export const setLoader = (status) => {
  return {
    type: SET_LOADER,
    payload: status,
  };
};

export const removeLoader = (status) => {
  return {
    type: REMOVE_LOADER,
    payload: status,
  };
};
