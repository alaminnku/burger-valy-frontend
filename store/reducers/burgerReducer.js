import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_SIDE,
  REMOVE_SIDE,
  SET_BURGER,
  SET_BURGER_TYPE,
  FETCH_PRICE,
} from "../actions/actionTypes";

const initialState = {
  price: {},
  burger: {
    ingredients: {
      Salad: 0,
      Cheese: 0,
      Patty: 0,
      Bacon: 0,
    },
    totalPrice: 4,
    side: "",
    type: "",
  },
};

const burgerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRICE:
      return {
        ...state,
        price: {
          ...state.price,
          ...payload,
        },
      };

    case SET_BURGER_TYPE:
      return {
        ...state,
        burger: {
          ...state.burger,
          type: payload,
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
        burger: {
          ...state.burger,
          totalPrice: state.burger.totalPrice + payload.price,
          side: payload.size,
        },
      };

    case REMOVE_SIDE:
      return {
        ...state,
        burger: {
          ...state.burger,
          totalPrice: state.burger.totalPrice - payload.price,
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
