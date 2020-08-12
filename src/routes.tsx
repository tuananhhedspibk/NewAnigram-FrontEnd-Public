import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'unfetch';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastProvider } from 'react-toast-notifications';

import { store, persistor } from './redux/store';

import { SignUp } from './components/auth/SignUp';
import { SignIn } from './components/auth/SignIn';
import { ActiveAccount } from './components/auth/ActiveAccount';
import { SendActiveMail } from './components/auth/SendActiveMail';

import { Home } from './components/mains/Home';

import { PostSinglePage } from './components/post/SinglePage';
import { NotFound404 } from './components/shared/NotFound404';

import { UsersIndex } from './components/user/Index';
import { UserProfile } from './components/user/Profile';

import { NotificationSnackBar } from
  './components/notification/NotificationSnackBar';
import { NotificationsIndex } from
  './components/notification/Index';

import {
  API_HOST,
  API_ROUTES,
  JWT_TOKEN,
  ROUTES,
  WS_HOST
} from './components/utils/constants';

const httpLink = createHttpLink({
  uri: `${API_HOST}/${API_ROUTES.GraphQL}`,
  fetch,
});

const wsLink = new WebSocketLink({
  uri: `${WS_HOST}/${API_ROUTES.Subscriptions}`,
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(JWT_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    }
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const history = createBrowserHistory();

export const Routes = () => (
  <ApolloProvider client={client}>
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
              <Route path={ROUTES.Home} component={Home} />
              <Route
                path={ROUTES.SuggestFriends}
                component={UsersIndex}
              />
              <Route
                path={ROUTES.ActiveAccount}
                component={ActiveAccount}
              />
              <Route
                path={ROUTES.SendActiveMail}
                component={SendActiveMail}
              />
              <Route
                path={ROUTES.Notifications}
                component={NotificationsIndex}
              />
              <Route path={`${ROUTES.Posts}/:id`} component={PostSinglePage} />
              <Route path={ROUTES.Profile} component={UserProfile} />
              <Route path={ROUTES.Root} render={() => (
                <Redirect to={ROUTES.Home}/>  
              )}/>
              <Route status={404} path='*' component={ NotFound404 } />
            </Switch>
          </Router>
        </PersistGate>
      </ToastProvider>
    </Provider>
  </ApolloProvider>
);
