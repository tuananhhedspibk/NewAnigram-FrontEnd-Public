import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { ApplicationBar } from '../shared/ApplicationBar';
import { AlertSnackBar } from '../shared/AlertSnackBar';
import { Post } from './Post';

import fetchPost from '../../lib/queries/fetchPost';
import postLikeRelateSubscription from '../../lib/subscriptions/postLikeRelate';
import commentAddedSubscription from '../../lib/subscriptions/commentAdded';

import { authStateSelector } from '../../redux/selectors';

import {
  getLocalStorageUserId,
  handleSnackBar,
} from '../utils/helpers';
import { ROUTES } from '../utils/constants';

import { MAIN_THEME } from '../../assets/styles/themes';
import { postSinglePageStyle } from '../../assets/styles/postSinglePage';

interface PostSinglePageProps {
  history: any;
};

export const PostSinglePage = (props: PostSinglePageProps): JSX.Element => {
  const classes = postSinglePageStyle(MAIN_THEME);
  const {
    history,
  } = props;
  const postId = history.location.pathname.split('/')[2];
  const localStorageUserId = getLocalStorageUserId();

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');
  const [ postData, setPostData ] = useState(null as any);

  const postQueryResult = useQuery(fetchPost, {
    variables: {
      id: postId,
    },
  });
  const postLikeRelateSubscriptionResult = useSubscription(
    postLikeRelateSubscription, {
      variables: {
        currentUserId: localStorageUserId,
      }
    }
  );
  const commentAddedSubscriptionResult = useSubscription(
    commentAddedSubscription, {
      variables: {
        currentUserId: localStorageUserId,
      }
    }
  );

  const authState = useSelector(authStateSelector);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push(ROUTES.SignIn);
    }
  }, [ authState.isAuthenticated, history ]);

  useEffect(() => {
    if (postQueryResult.data) {
      setPostData(postQueryResult.data.post);
    }
  }, [ postQueryResult ]);

  useEffect(() => {
    if (postLikeRelateSubscriptionResult.data !== undefined
      && postLikeRelateSubscriptionResult.data.postLikeRelate) {
      const response = postLikeRelateSubscriptionResult.data.postLikeRelate;

      if (response.srcUserId === localStorageUserId) {
        setPostData({
          ...postData,
          numberLikes: response.postNumberLikes,
          beLiked: response.beLiked,
        });
      } else {
        setPostData({
          ...postData,
          numberLikes: response.postNumberLikes,
        });
      }
    }
  }, [ postLikeRelateSubscriptionResult.data ]);

  useEffect(() => {
    if (commentAddedSubscriptionResult.data !== undefined
      && commentAddedSubscriptionResult.data.commentAdded) {
      const response = commentAddedSubscriptionResult.data.commentAdded;

      setPostData({
        ...postData,
        comments: [
          ...postData.comments,
          response.comment,
        ]
      });
    }
  }, [ commentAddedSubscriptionResult.data ]);

  const snackBarHandler = (
    status: number,
    type: string,
    message: string,
  ) => {
    handleSnackBar(
      status,
      type,
      message,
      setSnackBarOpen,
      setSnackBarType,
      setSnackBarMessage
    );
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <ApplicationBar history={history} />
      <AlertSnackBar
        message={snackBarMessage}
        type={snackBarType}
        open={snackBarOpen}
        handleClose={() => setSnackBarOpen(false)}
      />
      <div className={classes.postWrapper}>
        <Post
          data={postData}
          snackBarHandler={snackBarHandler}
        />
      </div>
    </MuiThemeProvider>
  );
}
