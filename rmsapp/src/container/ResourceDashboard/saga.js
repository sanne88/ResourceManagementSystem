import { all, takeLatest, call, put } from "redux-saga/effects";

import { updateResourceData } from "./actions";
import { FETCH_DATA,  } from "./constants";
export function* fetchResources() {
    try {
      const  data  = ['JAVA', 'C SHARP'];
     
    let test="";
    fetch("http://localhost:8080/api/GetResourceData")
.then((res) => res.text())
.then((data) => 
{
  console.log(data);
 test=data;
}
);
    console.log(test);
      yield put(updateResourceData(data));
    
    } catch (err) {
    }
  }
  export default function* getData() {
   
  yield takeLatest(FETCH_DATA, fetchResources);
  }