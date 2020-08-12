import React from 'react';
import { createMemoryHistory } from 'history';

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithRouter, randomEmail } from '../../utils/helpers';
import {
  DEFAULT_TEST_EMAIL,
  DEFAULT_TEST_PASSWORD,
} from '../../utils/constants';

import { UserRepository } from '../../libs/repositories';

import { ROUTES, JWT_TOKEN, USER_INFO } from '../../../components/utils/constants';
import { delay } from '../../../components/utils/helpers';

import { SignIn } from '../../../components/auth/SignIn';

test('(UI) Page has "NewAnigram" title', () => {
  let signInComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  expect(signInComponent.container.innerHTML).toMatch('NewAnigram');

  act(() => {
    signInComponent.unmount();
  });
});

test('(UI) Page has Labels, Inputs for email and password', () => {
  let signInComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  const labels =
    signInComponent.container.getElementsByClassName('MuiInputLabel-root');

  expect(labels.length).toEqual(2);
  expect(labels[0].textContent).toEqual('Email');
  expect(labels[1].textContent).toEqual('Password');

  const inputs =
    signInComponent.container.getElementsByClassName('MuiInputBase-input');

  expect(inputs.length).toEqual(2);

  act(() => {
    signInComponent.unmount();
  });
});

test('(UI) Page has button with the text "Sign In" inside of it', () => {
  let signInComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  const buttons =
    signInComponent.container.getElementsByClassName('MuiButtonBase-root');
  
  expect(buttons[1].textContent).toEqual('Sign In');

  act(() => {
    signInComponent.unmount();
  });
});

test('(Func) Email, Password input has the same text with users input', () => {
  let signInComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  const inputs =
    signInComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];
  const passwordInput = inputs[1];

  act(() => {
    fireEvent.change(emailInput, {
      target: { value: DEFAULT_TEST_EMAIL }
    });
  });
  act(() => {
    fireEvent.change(passwordInput, {
      target: { value: DEFAULT_TEST_PASSWORD }
    });
  });

  expect(emailInput.value).toEqual(DEFAULT_TEST_EMAIL);
  expect(passwordInput.value).toEqual(DEFAULT_TEST_PASSWORD);

  act(() => {
    signInComponent.unmount();
  });
});

test('(Func) Validate Email (When email is not valid)', () => {
  let signInComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  const inputs =
    signInComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];

  act(() => {
    fireEvent.change(emailInput, { target: { value: 'test' } });
  });

  const labels =
    signInComponent.container.getElementsByTagName('label');

  expect(labels[0].textContent).toEqual('Email is not valid');

  act(() => {
    signInComponent.unmount();
  });
});

test('(Func) Validate Email (When email is valid)', () => {
  let signInComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  const inputs =
    signInComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];

  act(() => {
    fireEvent.change(emailInput, {
      target: { value: DEFAULT_TEST_EMAIL }
    });
  });

  const labels =
    signInComponent.container.getElementsByTagName('label');

  expect(labels[0].textContent).toEqual('Email');

  act(() => {
    signInComponent.unmount();
  });
});

test('(Func) Submit successfully', async () => {
  let signInComponent: any = null;
  
  const testUserEmail = randomEmail();

  await UserRepository.create(testUserEmail, DEFAULT_TEST_PASSWORD);

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })}/>,
      ROUTES.SignIn,
    );
  });

  const inputs =
    signInComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];
  const passwordInput = inputs[1];

  const submitButton =
    signInComponent.container.getElementsByTagName('button')[1];

  act(() => {
    fireEvent.change(emailInput, {
      target: { value: testUserEmail }
    });
  });
  act(() => {
    fireEvent.change(passwordInput, {
      target: { value: DEFAULT_TEST_PASSWORD }
    });
  });

  await act(async () => {
    fireEvent.click(submitButton);

    await delay(3000);
  });

  const jwtToken = localStorage.getItem(JWT_TOKEN) as string;
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);

  expect(jwtToken.length).toBeGreaterThan(0);
  expect(Object.keys(userInfo).length).toBeGreaterThan(0);
});
