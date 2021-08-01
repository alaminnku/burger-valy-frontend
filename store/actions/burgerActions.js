import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_PRICE,
  ADD_SIDE,
  REMOVE_SIDE,
  SET_BURGER,
  SET_BURGER_TYPE,
} from "./actionTypes";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "config";

// Update price
export const updatePrice = () => async (dispatch) => {
  let price;

  if (Cookies.getJSON("price")) {
    price = Cookies.getJSON("price");
  } else {
    const res = await axios.get(`${API_URL}/burger-price`);
    const { patty, cheese, salad, bacon, small, medium, large } = res.data;

    // Fetched price
    const fetchedPrice = { patty, cheese, salad, bacon, small, medium, large };

    // Set to cookie
    Cookies.set("price", fetchedPrice, { sameSite: "strict" });

    // Get the price from cookies
    price = Cookies.getJSON("price");
  }

  dispatch({
    type: UPDATE_PRICE,
    payload: price,
  });
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
  console.log(price);
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
