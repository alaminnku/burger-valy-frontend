import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_SIDE,
  REMOVE_SIDE,
  SET_BURGER,
  SET_BURGER_TYPE,
  FETCH_PRICE,
} from "./actionTypes";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "config";

// Fetch the price
export const updatePrice = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/price`);
    const {
      patty,
      cheese,
      salad,
      bacon,
      small,
      medium,
      large,
      clubSandwich,
      crispyFriedChicken,
      fishFingers,
      mexicanTaco,
      pasta,
      pepperoniPizza,
      subSandwich,
      mushroomSalad,
    } = res.data;

    // Fetched price
    const price = {
      patty,
      cheese,
      salad,
      bacon,
      small,
      medium,
      large,
      clubSandwich,
      crispyFriedChicken,
      fishFingers,
      mexicanTaco,
      pasta,
      pepperoniPizza,
      subSandwich,
      mushroomSalad,
    };

    dispatch({
      type: FETCH_PRICE,
      payload: price,
    });
  } catch (err) {
    console.log(err);
  }
};

// Set burger type
export const setBurgerType = (type) => {
  return {
    type: SET_BURGER_TYPE,
    payload: type,
  };
};

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

// Add side
export const addSide = (price, size) => {
  return {
    type: ADD_SIDE,
    payload: { price, size },
  };
};

// Add side
export const removeSide = (price, size) => {
  return {
    type: REMOVE_SIDE,
    payload: { price, size },
  };
};

// Get the burger from cookie and set to state
export const setBurger = () => {
  const burger = Cookies.getJSON("burger");

  return {
    type: SET_BURGER,
    payload: burger,
  };
};
