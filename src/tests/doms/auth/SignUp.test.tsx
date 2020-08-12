import React from 'react';
import { createMemoryHistory } from 'history';

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithRouter } from '../../utils/helpers';
import {
  DEFAULT_TEST_EMAIL,
  DEFAULT_TEST_PASSWORD,
  DEFAULT_TEST_SAFE_PASSWORD,
} from '../../utils/constants';
import {
  ROUTES,
  USER_SIGNUP_EMAIL,
} from '../../../components/utils/constants';
import { delay } from '../../../components/utils/helpers';

import { SignUp } from '../../../components/auth/SignUp';

test('(UI) Page has "NewAnigram" title', () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })} />,
      ROUTES.SignUp,
    );
  });

  expect(signUpComponent.container.innerHTML).toMatch('NewAnigram');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(UI) Page has Labels, Inputs for email, password, confirmPassword', () => {
  let signUpComponent: any = null;
  
  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })} />,
      ROUTES.SignUp,
    );
  });

  const labels =
    signUpComponent.container.getElementsByClassName('MuiInputLabel-root');

  expect(labels.length).toEqual(3);
  expect(labels[0].textContent).toEqual('Email');
  expect(labels[1].textContent).toEqual('Password');
  expect(labels[2].textContent).toEqual('Confirm Password');

  const inputs =
    signUpComponent.container.getElementsByClassName('MuiInputBase-input');

  expect(inputs.length).toEqual(3);

  act(() => {
    signUpComponent.unmount();
  });
});

test('(UI) Page has button with the text "Sign Up" inside of it', () => {
  let signUpComponent: any = null;
  
  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })} />,
      ROUTES.SignUp,
    );
  });

  const buttons =
    signUpComponent.container.getElementsByClassName('MuiButtonBase-root');
  
  expect(buttons[2].textContent).toEqual('Sign Up');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Email, Password, ConfirmPassword input has the same text with users input', () => {
  let signUpComponent: any = null;
  
  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })} />,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];
  const passwordInput = inputs[1];
  const confirmPasswordInput = inputs[2];

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
  act(() => {
    fireEvent.change(confirmPasswordInput, {
      target: { value: DEFAULT_TEST_PASSWORD }
    });
  });

  expect(emailInput.value).toEqual(DEFAULT_TEST_EMAIL);
  expect(passwordInput.value).toEqual(DEFAULT_TEST_PASSWORD);
  expect(confirmPasswordInput.value).toEqual(DEFAULT_TEST_PASSWORD);

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Validate Email (When email is not valid)', () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];

  act(() => {
    fireEvent.change(emailInput, { target: { value: 'test' } });
  });

  const labels =
    signUpComponent.container.getElementsByTagName('label');

  expect(labels[0].textContent).toEqual('Email is not valid');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Validate Email (When email is valid)', () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];

  act(() => {
    fireEvent.change(emailInput, {
      target: { value: DEFAULT_TEST_EMAIL }
    });
  });

  const labels =
    signUpComponent.container.getElementsByTagName('label');

  expect(labels[0].textContent).toEqual('Email');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Validate password (safe password)', () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const passwordInput = inputs[1];

  act(() => {
    fireEvent.change(passwordInput, {
      target: { value: DEFAULT_TEST_SAFE_PASSWORD }
    });
  });

  const labels =
    signUpComponent.container.getElementsByTagName('label');

  expect(labels[1].textContent).toEqual('Password safe ✓');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Validate password (unsafe password)', () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const passwordInput = inputs[1];

  act(() => {
    fireEvent.change(passwordInput, { target: { value: 'test' } });
  });

  const labels =
    signUpComponent.container.getElementsByTagName('label');

  expect(labels[1].textContent).toEqual('Password unsafe ✗');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Validate password (password === confirmPassword)', () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const passwordInput = inputs[1];
  const confirmPasswordInput = inputs[2];

  act(() => {
    fireEvent.change(passwordInput, {
      target: { value: DEFAULT_TEST_PASSWORD }
    });
  });
  act(() => {
    fireEvent.change(confirmPasswordInput, {
      target: { value: DEFAULT_TEST_PASSWORD }
    });
  });

  const labels =
    signUpComponent.container.getElementsByTagName('label');

  expect(labels[2].textContent).toEqual('Confirm Password');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Validate password (password !== confirmPassword)', () => {
  let signUpComponent: any = null;
  
  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const passwordInput = inputs[1];
  const confirmPasswordInput = inputs[2];

  act(() => {
    fireEvent.change(passwordInput, {
      target: { value: DEFAULT_TEST_PASSWORD }
    });
  });
  
  act(() => {
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'test' }
    });
  });

  const labels =
    signUpComponent.container.getElementsByTagName('label');

  expect(labels[2].textContent)
    .toEqual('Confirm Password isn\'t same with Password');

  act(() => {
    signUpComponent.unmount();
  });
});

test('(Func) Submit successfully', async () => {
  let signUpComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={createMemoryHistory({
        initialEntries: [ ROUTES.SignUp ]
      })}/>,
      ROUTES.SignUp,
    );
  });

  const inputs =
    signUpComponent.container.getElementsByTagName('input');
  const emailInput = inputs[0];
  const passwordInput = inputs[1];
  const confirmPasswordInput = inputs[2];

  const submitButton =
    signUpComponent.container.getElementsByTagName('button')[2];

  act(() => {
    fireEvent.change(emailInput, {
      target: { value: DEFAULT_TEST_EMAIL }
    });
  });
  act(() => {
    fireEvent.change(passwordInput, {
      target: { value: DEFAULT_TEST_SAFE_PASSWORD }
    });
  });
  act(() => {
    fireEvent.change(confirmPasswordInput, {
      target: { value: DEFAULT_TEST_SAFE_PASSWORD }
    });
  });

  await act(async () => {
    fireEvent.click(submitButton);

    await delay(3000);
  });

  expect(localStorage.getItem(USER_SIGNUP_EMAIL)).toEqual(DEFAULT_TEST_EMAIL);

  act(() => {
    signUpComponent.unmount();
  });
});
