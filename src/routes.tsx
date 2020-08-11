import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

const history = createBrowserHistory();

export const Routes = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>

      </Router>
    </PersistGate>
  </Provider>
);
