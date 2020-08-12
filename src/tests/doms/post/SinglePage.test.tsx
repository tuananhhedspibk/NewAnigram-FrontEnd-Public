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

import { PostSinglePage } from '../../../components/post/SinglePage';
import { SignIn } from '../../../components/auth/SignIn';

let defaultUser: any = null;
let defaultPost: any = null;

const defaultUserEmail = randomEmail();
const defaultPostContent = 'Post content';
const defaultPostTags = [ 'tag1', 'tag2' ];

beforeAll(async () => {
  defaultUser = await
    UserRepository.create(defaultUserEmail, DEFAULT_TEST_PASSWORD);

  defaultPost = await
    PostRepository.create(
      randomId(),
      defaultPostContent,
      defaultPostTags,
      [ 'img1', 'img2' ],
      defaultUser
    );
});

test('(UI) Render post content correctly', async () => {
  let signInComponent: any = null;
  let postSinglePageComponent: any = null;

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
    postSinglePageComponent = renderWithRouter(
      <PostSinglePage
        history={
          createMemoryHistory({
            initialEntries: [`${ROUTES.Posts}/${defaultPost.id}`]
          })
        }
      />,
      `${ROUTES.Posts}/${defaultPost.id}`,
    );
  });

  await act(async () => {
    await delay(3000);
  });

  expect(postSinglePageComponent.container.innerHTML).toMatch(
    defaultPostContent
  );
  expect(postSinglePageComponent.container.innerHTML).toMatch(
    formatTimeFromMiliseconds(defaultPost.createdAt)
  );
  expect(postSinglePageComponent.container.innerHTML).toMatch(
    defaultPostTags[0]
  );
  expect(postSinglePageComponent.container.innerHTML).toMatch(
    defaultPostTags[1]
  );
});
