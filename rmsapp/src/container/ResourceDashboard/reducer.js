
import produce from 'immer';
import { FETCH_DATA, UPDATE_RESOURCE_DATA } from './constants';
export const initialState={
    resourceData: [],
};


const resourceReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    case FETCH_DATA:
        break;
    case UPDATE_RESOURCE_DATA:       
        draft.resourceData = action.resourceData;      
        break;
    default:
        break;
    }
  });

export default resourceReducer;
