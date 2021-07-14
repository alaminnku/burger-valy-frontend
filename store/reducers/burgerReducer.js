import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_PRICE,
  ADD_SIDE,
} from "../actions/actionTypes";

const initialState = {
  ingredients: {
    Salad: 0,
    Cheese: 0,
    Meat: 0,
    Bacon: 0,
  },
  side: "",
  price: {},
  totalPrice: 4,
};

const burgerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.name]: state.ingredients[payload.name] + 1,
        },
        totalPrice: state.totalPrice + payload.price,
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.name]: state.ingredients[payload.name] - 1,
        },
        totalPrice: state.totalPrice - [payload.price],
      };

    case UPDATE_PRICE:
      return {
        ...state,
        price: {
          ...state.price,
          ...payload,
        },
      };

    case ADD_SIDE:
      return {
        ...state,
        side: payload.size,
        totalPrice: state.totalPrice + payload.price,
      };

    default:
      return state;
  }
};

export default burgerReducer;
