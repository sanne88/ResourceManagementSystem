import { all } from "redux-saga/effects";
import ResourceDashboard from "./container/ResourceDashboard/saga";
function* rootSaga() {
  
    yield all([ResourceDashboard()]);
}

export default rootSaga;
