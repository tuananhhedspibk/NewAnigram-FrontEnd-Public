import { createSelector } from 'reselect';

export const authStateSelector = createSelector(
  (state: any) => state.auth,
  auth => auth,
);
