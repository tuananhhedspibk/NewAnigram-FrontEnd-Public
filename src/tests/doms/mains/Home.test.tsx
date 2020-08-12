import React from 'react';
import { createMemoryHistory } from 'history';

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { UserRepository, PostRepository } from '../../libs/repositories';

import { renderWithRouter, randomEmail } from '../../utils/helpers';
import {
  DEFAULT_TEST_PASSWORD,
} from '../../utils/constants';

import { ROUTES } from '../../../components/utils/constants';
import { randomId, delay, formatTimeFromMiliseconds } from '../../../components/utils/helpers';

import { SignIn } from '../../../components/auth/SignIn';
import { Home } from '../../../components/mains/Home';

let defaultUser: any = null;

const defaultPosts: any = [];
const defaultUserEmail = randomEmail();
const defaultPostsContent = [
  'Post 1 content',
  'Post 2 content',
  'Post 3 content',
  'Post 4 content',
  'Post 5 content',
  'Post 6 content',
  'Post 7 content',
  'Post 8 content',
  'Post 9 content',
  'Post 10 content',
];
const defaultPostsTags = [
  [ 'p1-tag1', 'p1-tag2' ],
  [ 'p2-tag1', 'p2-tag2' ],
  [ 'p3-tag1', 'p3-tag2' ],
  [ 'p4-tag1', 'p4-tag2' ],
  [ 'p5-tag1', 'p5-tag2' ],
  [ 'p6-tag1', 'p6-tag2' ],
  [ 'p7-tag1', 'p7-tag2' ],
  [ 'p8-tag1', 'p8-tag2' ],
  [ 'p9-tag1', 'p9-tag2' ],
  [ 'p10-tag1', 'p10-tag2' ],
];
const defaultImagesList = [
  'img1', 'img2',
];

beforeAll(async () => {
  defaultUser = await
    UserRepository.create(defaultUserEmail, DEFAULT_TEST_PASSWORD);

  for(let i = 0; i < defaultPostsContent.length; i++) {
    const post = await PostRepository.create(
      randomId(),
      defaultPostsContent[i],
      defaultPostsTags[i],
      defaultImagesList,
      defaultUser,
    );

    defaultPosts.push(post);
  }
});

test('(UI) Render posts correctly', async () => {
  let signInComponent: any = null;
  let homeComponent: any = null;

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
      target: { value: defaultUserEmail }
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

  act(() => {
    signInComponent.unmount();
  });

  act(() => {
    homeComponent = renderWithRouter(
      <Home
        history={
          createMemoryHistory({
            initialEntries: [ ROUTES.Home ]
          })
        }
      />,
      ROUTES.Home,
    );
  });

  await act(async () => {
    await delay(3000);
  });

  for (let i = defaultPosts.length - 1; i >= 1; i--) {
    expect(homeComponent.container.innerHTML).toMatch(defaultPosts[i].content);
    expect(homeComponent.container.innerHTML).toMatch(
      formatTimeFromMiliseconds(defaultPosts[i].createdAt)
    );
  }
});
