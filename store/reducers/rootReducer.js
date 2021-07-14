import { combineReducers } from "redux";
import burgerReducer from "./burgerReducer";

// Combine the reducers
export default combineReducers({ burger: burgerReducer });
