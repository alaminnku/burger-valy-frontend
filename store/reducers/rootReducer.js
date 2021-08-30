import { combineReducers } from "redux";
import burgerReducer from "./burgerReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loaderReducer from "./loaderReducer";
import itemReducer from "./itemReducer";

// Combine the reducers
export default combineReducers({
  burger: burgerReducer,
  auth: authReducer,
  alerts: alertReducer,
  loader: loaderReducer,
  item: itemReducer,
});
