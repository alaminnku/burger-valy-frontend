import { combineReducers } from "redux";
import burgerReducer from "./burgerReducer";
import authReducer from "./authReducer";

// Combine the reducers
export default combineReducers({ burger: burgerReducer, auth: authReducer });
