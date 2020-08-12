import React from 'react';
import { createMemoryHistory } from 'history';

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { SendActiveMail } from '../../../components/auth/SendActiveMail';
import { SignUp } from '../../../components/auth/SignUp';

import { renderWithRouter } from '../../utils/helpers';
import {
  DEFAULT_TEST_EMAIL,
  DEFAULT_TEST_SAFE_PASSWORD,
} from '../../utils/constants';
import { ROUTES } from '../../../components/utils/constants';
import { delay } from '../../../components/utils/helpers';

test('(UI) Page has signed up email in title', async () => {
  let signUpComponent: any = null;
  let sendActiveMailComponent: any = null;

  act(() => {
    signUpComponent = renderWithRouter(
      <SignUp history={
        createMemoryHistory({
          initialEntries: [ ROUTES.SignUp ]
        })
      }/>,
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

  act(() => {
    sendActiveMailComponent = renderWithRouter(
      <SendActiveMail history={createMemoryHistory({
        initialEntries: [ ROUTES.SendActiveMail ]
      })} />,
      ROUTES.SendActiveMail,
    );
  });

  expect(
    sendActiveMailComponent.container.innerHTML
  ).toMatch(`We have sent you an active account email,\
            check your email (${DEFAULT_TEST_EMAIL}) for more details.`
  );

  act(() => {
    signUpComponent.unmount();
  });
  act(() => {
    sendActiveMailComponent.unmount();
  });
});
