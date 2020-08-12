import React from 'react';
import { createMemoryHistory } from 'history';

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import {
  SuggestFriendRepository,
  UserRepository,
} from '../../libs/repositories';

import { renderWithRouter, randomEmail } from '../../utils/helpers';
import {
  DEFAULT_TEST_SAFE_PASSWORD,
} from '../../utils/constants';

import { ROUTES, BATCH_ITEMS_SIZE } from '../../../components/utils/constants';
import { delay } from '../../../components/utils/helpers';

import { UsersIndex } from '../../../components/user/Index';
import { SignIn } from '../../../components/auth/SignIn';

let testUser: any = null;

const testUserEmail = randomEmail();
const suggestUsersData: any = [];

beforeAll(async () => {
  testUser = await UserRepository.create(
    testUserEmail,
    DEFAULT_TEST_SAFE_PASSWORD,
  );

  for (let i = 0; i < BATCH_ITEMS_SIZE + 1; i++) {
    const userEmail = randomEmail();
    const user = await UserRepository.create(
      userEmail,
      DEFAULT_TEST_SAFE_PASSWORD,
    );

    suggestUsersData.push({
      id: user.id,
      email: userEmail,
    });
  }

  await SuggestFriendRepository.create(
    testUser.id,
    suggestUsersData,
  );
});

test('(UI) Render users correctly', async () => {
  let signInComponent: any = null;
  let usersIndexComponent: any = null;

  act(() => {
    signInComponent = renderWithRouter(
      <SignIn history={createMemoryHistory({
        initialEntries: [ ROUTES.SignIn ]
      })} />,
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
      target: { value: DEFAULT_TEST_SAFE_PASSWORD }
    });
  });

  await act(async () => {
    fireEvent.click(submitButton);

    await delay(3000);
  });

  act(() => {
    usersIndexComponent = renderWithRouter(
      <UsersIndex history={createMemoryHistory({
        initialEntries: [ ROUTES.SuggestFriends ]
      })} />,
      ROUTES.SuggestFriends,
    );
  });

  await act(async () => {
    await delay(1800);
  });

  const userItems =
    usersIndexComponent.container.getElementsByClassName(
      'makeStyles-itemRoot-61'
    );

  expect(userItems.length).toEqual(suggestUsersData.length);

  const userNameTexts =
    usersIndexComponent.container.getElementsByClassName(
      'makeStyles-itemUserNameText-69'
    );

  expect(userNameTexts.length).toEqual(suggestUsersData.length);

  for (let i = 0; i < userNameTexts.length; i++) {
    expect(userNameTexts[i].textContent).toEqual(
      suggestUsersData[i].email
    );
  }

  let loadMoreButtons =
    usersIndexComponent.container.getElementsByClassName(
      'makeStyles-loadMoreButton-27'
    );
  let hiddenRows =
    usersIndexComponent.container.getElementsByClassName(
      'makeStyles-hiddenRow-15'
    );

  expect(hiddenRows.length).toEqual(1);
  expect(loadMoreButtons.length).toEqual(1);

  act(() => {
    fireEvent.click(loadMoreButtons[0]);
  });

  await act(async () => {
    await delay(1500);
  });

  loadMoreButtons =
    usersIndexComponent.container.getElementsByClassName(
      'makeStyles-loadMoreButton-27'
    );
  expect(loadMoreButtons.length).toEqual(0);
});
