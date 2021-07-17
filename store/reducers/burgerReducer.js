import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_PRICE,
  ADD_SIDE,
  SET_BURGER,
} from "../actions/actionTypes";

const initialState = {
  price: {},
  burger: {
    ingredients: {
      Salad: 0,
      Cheese: 0,
      Meat: 0,
      Bacon: 0,
    },
    totalPrice: 4,
    side: "",
  },
};

const burgerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PRICE:
      return {
        ...state,
        price: {
          ...state.price,
          ...payload,
        },
      };

    case ADD_INGREDIENT:
      return {
        ...state,
        burger: {
          ...state.burger,
          ingredients: {
            ...state.burger.ingredients,
            [payload.name]: state.burger.ingredients[payload.name] + 1,
          },
          totalPrice: state.burger.totalPrice + payload.price,
        },
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        burger: {
          ...state.burger,
          ingredients: {
            ...state.burger.ingredients,
            [payload.name]: state.burger.ingredients[payload.name] - 1,
          },
          totalPrice: state.burger.totalPrice - payload.price,
        },
      };

    case ADD_SIDE:
      return {
        ...state,
        side: payload.size,
        burger: {
          ...state.burger,
          totalPrice: state.burger.totalPrice + payload.price,
          side: payload.size,
        },
      };

    case SET_BURGER:
      return {
        ...state,
        burger: {
          ...state.burger,
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default burgerReducer;
