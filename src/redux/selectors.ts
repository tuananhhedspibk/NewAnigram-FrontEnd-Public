import { createSelector } from 'reselect';

export const authStateSelector = createSelector(
  (state: any) => state.auth,
  auth => auth,
);

export const notifyStateSelector = createSelector(
  (state: any) => state.notify,
  notify => notify,
);
