import { combineReducers } from "redux";
import  resourceReducer from     "./container/ResourceDashboard/reducer"
export default combineReducers({
  ResourceDashboard: resourceReducer,
});
