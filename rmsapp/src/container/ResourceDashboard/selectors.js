
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.ResourceDashboard || initialState;

const makeSelectResourceData = () =>

  createSelector(
    selectGlobal,
    globalState => globalState.resourceData,
  );

  export { makeSelectResourceData, }