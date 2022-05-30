import { FETCH_DATA, UPDATE_RESOURCE_DATA } from "./constants";

export function fetchResourceData() {
    return {
      type: FETCH_DATA,
    };
  }

  export function updateResourceData(resourceData)
  {
    return{
      type: UPDATE_RESOURCE_DATA,
      resourceData,
    }
  }

  