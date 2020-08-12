import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'react-router-dom';

import { ToastProvider } from 'react-toast-notifications';

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ApolloProvider } from 'react-apollo';

import { store, persistor } from '../../redux/store';

import { client } from '../../routes';

import { NotificationSnackBar } from
  '../../components/notification/NotificationSnackBar';

import { CHARACTERS_CHAIN } from './constants';

export const renderWithRouter = (
  ui: any,
  route: string = '/',
) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  const wrapper: any = ({ children }: any) => (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ToastProvider
          placement='bottom-right'
          components={{ Toast: NotificationSnackBar }}
        >
          <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
              {children}
            </Router>
          </PersistGate>
        </ToastProvider>
      </Provider>
    </ApolloProvider>
  );

  return render(ui, { wrapper });
}

const randomString = (length=16) => {
  let result = '';
  for (let i = 0; i < length; i++ ) {
    result += CHARACTERS_CHAIN.charAt(
      Math.floor(Math.random() * CHARACTERS_CHAIN.length)
    );
  }

  return result;
}

export const randomEmail = (): string => {
  return `${randomString().toLowerCase()}@testmail.com`;
}
