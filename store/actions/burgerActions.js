import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_PRICE,
  ADD_SIDE,
} from "./actionTypes";

// Add ingredient action
export const addIngredient = (name, price) => {
  return {
    type: ADD_INGREDIENT,
    payload: { name, price },
  };
};

// Remove ingredient action
export const removeIngredient = (name, price) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: { name, price },
  };
};

// Update price
export const updatePrice = (price) => {
  return {
    type: UPDATE_PRICE,
    payload: price,
  };
};

// Add side
export const addSide = (price, size) => {
  return {
    type: ADD_SIDE,
    payload: { price, size },
  };
};
