import { SET_ITEM } from "@store/actions/actionTypes";

const initialState = {
  name: "",
  quantity: "",
  price: "",
};

const itemReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ITEM:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default itemReducer;
