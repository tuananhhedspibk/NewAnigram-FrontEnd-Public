import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastProvider } from 'react-toast-notifications';

import { store, persistor } from './redux/store';

import { SignUp } from './components/auth/SignUp';
import { SignIn } from './components/auth/SignIn';
import { NotificationSnackBar } from
  './components/notification/NotificationSnackBar';

import { ROUTES } from './components/utils/constants';

const history = createBrowserHistory();

export const Routes = () => (
  <Provider store={store}>
    <ToastProvider
      placement='bottom-right'
      components={{ Toast: NotificationSnackBar }}
    >
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route path={ROUTES.SignUp} component={SignUp} />
            <Route path={ROUTES.SignIn} component={SignIn} />
          </Switch>
        </Router>
      </PersistGate>
    </ToastProvider>
  </Provider>
);
