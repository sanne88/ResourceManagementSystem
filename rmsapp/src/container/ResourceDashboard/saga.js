import { all, takeLatest, call, put } from "redux-saga/effects";

import { updateResourceData } from "./actions";
import { FETCH_DATA,  } from "./constants";


export function* fetchResources() {
    try {
      const  data  = ['JAVA', 'C SHARP'];
     
      yield put(updateResourceData(data));
    
    } catch (err) {
    }
  }
  export default function* getData() {
   
  yield takeLatest(FETCH_DATA, fetchResources);
  }