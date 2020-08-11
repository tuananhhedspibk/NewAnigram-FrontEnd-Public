import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLazyQuery, useSubscription } from '@apollo/react-hooks';

import debounce from 'lodash.debounce';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { authStateSelector } from '../../redux/selectors';

import fetchPosts from '../../lib/queries/fetchPosts';
import postAddedSubscription from '../../lib/subscriptions/postAdded';
import postLikeRelateSubscription from '../../lib/subscriptions/postLikeRelate';
import commentAddedSubscription from '../../lib/subscriptions/commentAdded';

import { Post } from '../post/Post';
import { SuggestFriends } from '../shared/SuggestFriends';
import { CreatePostDialog } from '../post/CreatePostDialog';
import { UserBaseInfo } from '../user/BaseInfo';
import { ApplicationBar } from '../shared/ApplicationBar';
import { AlertSnackBar } from '../shared/AlertSnackBar';

import {
  ERROR_MESSAGES,
  MAX_NEW_COMING_POSTS_QUEUE_LENGTH,
  ROUTES,
  SCROLL_Y_POSITION,
  SNACKBAR_TYPES,
  PopupStatus,
} from '../utils/constants';
import {
  getLocalStorageUserId,
  getItemIndexById,
  handleSnackBar,
} from '../utils/helpers';

import { MAIN_THEME } from '../../assets/styles/themes';
import { homeStyle } from '../../assets/styles/home';
import { fabButtonStyle } from '../../assets/styles/fabButton';

interface HomeProps {
  history: any,
};

export const Home = (props: HomeProps): JSX.Element => {
  const classes = homeStyle(MAIN_THEME);
  const fabButtonClasses = fabButtonStyle(MAIN_THEME);

  const { history } = props;
  const localStorageUserId = getLocalStorageUserId();

  const topPageRef = useRef(null as any);

  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ isLoadingPosts, setIsLoadingPosts ] = useState(true);
  const [ canLoadMorePosts, setCanLoadMorePosts ] = useState(true);
  const [ scrollYPosition, setScrollYPosition ] = useState(
    SCROLL_Y_POSITION.Top
  );
  const [
    displayNewPostButton,
    setDisplayNewPostButton,
  ] = useState(false);
  const [
    lastShowingPostIndex,
    setLastShowingPostIndex,
  ] = useState(0);
  const [ posts, setPosts ] = useState([] as any);
  const [ newComingPosts, setNewComingPosts ] = useState([] as any);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const postAddedSubscriptionResult = useSubscription(
    postAddedSubscription, {
      variables: {
        currentUserId: localStorageUserId,
      }
    }
  );
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
  const fetchPostsQueryTuple = useLazyQuery(fetchPosts);

  const authState = useSelector(authStateSelector); 

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push(ROUTES.SignIn);
    } else {
      fetchPostsQueryTuple[0]({
        variables: {
          orderBy: {
            field: 'createdAt',
            direction: 'desc',
          },
          fromIndex: lastShowingPostIndex,
        }
      });
    }
  }, [
    authState.isAuthenticated,
    history,
  ]);

  useEffect(() => {
    if (fetchPostsQueryTuple[1].error !== undefined) {
      snackBarHandler(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        ERROR_MESSAGES.Post.Fetch,
      );
    } else if (fetchPostsQueryTuple[1].data !== undefined) {
      if (isLoadingPosts) {
        setIsLoadingPosts(false);
        setCanLoadMorePosts(fetchPostsQueryTuple[1].data.fetchPosts.canLoadMore);
        if (posts.length === 0) {
          setPosts(fetchPostsQueryTuple[1].data.fetchPosts.posts);
        } else {
          setPosts(posts.concat(fetchPostsQueryTuple[1].data.fetchPosts.posts));
        }
      }
    }
  }, [ fetchPostsQueryTuple[1] ]);

  useEffect(() => {
    setLastShowingPostIndex(posts.length + newComingPosts.length);
  }, [ posts ]);

  useEffect(() => {
    setLastShowingPostIndex(posts.length + newComingPosts.length);
  }, [ newComingPosts ]);

  useEffect(() => {
    if (postAddedSubscriptionResult.data !== undefined
      && postAddedSubscriptionResult.data.postAdded) {
      const newPost = postAddedSubscriptionResult.data.postAdded;

      if (newPost.user.id === localStorageUserId) {
        setPosts([ newPost, ...posts ]);
      } else {
        setNewComingPosts([ newPost, ...newComingPosts ]);
      }
    }
  }, [ postAddedSubscriptionResult.data ]);

  useEffect(() => {
    if (postLikeRelateSubscriptionResult.data !== undefined
      && postLikeRelateSubscriptionResult.data.postLikeRelate) {
      const response = postLikeRelateSubscriptionResult.data.postLikeRelate;
      const postIndex = getItemIndexById(posts, response.postId);

      if (postIndex > -1) {
        const currentPosts = posts.slice(0);

        if (response.srcUserId === localStorageUserId) {
          currentPosts.splice(postIndex, 1, {
            ...posts[postIndex],
            numberLikes: response.postNumberLikes,
            beLiked: response.beLiked,
          });
        } else {
          currentPosts.splice(postIndex, 1, {
            ...posts[postIndex],
            numberLikes: response.postNumberLikes,
          });
        }
        setPosts(currentPosts);
      }
    }
  }, [ postLikeRelateSubscriptionResult.data ]);

  useEffect(() => {
    if (commentAddedSubscriptionResult.data !== undefined
      && commentAddedSubscriptionResult.data.commentAdded) {
      const response = commentAddedSubscriptionResult.data.commentAdded;
      const postIndex = getItemIndexById(posts, response.postId);

      if (postIndex > -1) {
        const currentPosts = posts.slice(0);
        currentPosts.splice(postIndex, 1, {
          ...currentPosts[postIndex],
          comments: [
            ...currentPosts[postIndex].comments,
            response.comment,
          ]
        });

        setPosts(currentPosts);
      }
    }
  }, [ commentAddedSubscriptionResult.data ]);

  useEffect(() => {
    if (newComingPosts.length > MAX_NEW_COMING_POSTS_QUEUE_LENGTH) {
      setPosts(newComingPosts.concat(posts));
      setNewComingPosts([]);
      setDisplayNewPostButton(false);
    } else if (newComingPosts.length > 0 && !displayNewPostButton) {
      setDisplayNewPostButton(true);
    }
  }, [ newComingPosts.length ]);

  window.onscroll = debounce(async () => {
    if (scrollYPosition === SCROLL_Y_POSITION.Top
      && window.pageYOffset > 60) {
      setScrollYPosition(SCROLL_Y_POSITION.InsideBody);
    }
    if (scrollYPosition === SCROLL_Y_POSITION.InsideBody
      && window.pageYOffset < 60) {
      setScrollYPosition(SCROLL_Y_POSITION.Top);
    }
  }, 0);

  window.onscroll = debounce(async () => {
    const baseValue = 
      Math.round(window.innerHeight + document.documentElement.scrollTop);
    const pivotsSet = [baseValue - 13, baseValue - 12, baseValue - 11];

    if (pivotsSet.indexOf(document.documentElement.offsetHeight) > -1 && canLoadMorePosts) {
      handleLoadMorePosts();
    }
  }, 100);

  const handleLoadMorePosts = () => {
    setIsLoadingPosts(true);
    fetchPostsQueryTuple[0]({
      variables: {
        orderBy: {
          field: 'createdAt',
          direction: 'desc',
        },
        fromIndex: lastShowingPostIndex,
      }
    });
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  }

  const handleNewPostButtonClick = () => {
    setDisplayNewPostButton(false);
    setPosts(newComingPosts.concat(posts));
    setNewComingPosts([]);

    if (topPageRef) {
      topPageRef.current.scrollTo(0, 0);
    }
  }

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

  const renderCenterBlockContent = () => {
    if (posts.length > 0) {
      return posts.map((post: any, index: number) => (
        <Post
          key={index}
          data={post}
          snackBarHandler={snackBarHandler}
        />
      ))
    } else if (isLoadingPosts) {
      return <></>
    } 
    return (
      <div className={classes.emptyCenter}>
        <div>
          <p className={classes.title}>
            Feel free to share your first moment with us!
          </p>
          <Button
            variant='contained'
            size='medium'
            color='secondary'
            onClick={() => { setDialogOpen(true) }}
            className={classes.postButtonOfEmptyCenter}
          >
            Share my moment
          </Button>
        </div>
      </div>
    )
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <div className={classes.root} ref={topPageRef}>
        <ApplicationBar history={history} />
        <AlertSnackBar
          message={snackBarMessage}
          type={snackBarType}
          open={snackBarOpen}
          handleClose={() => setSnackBarOpen(false)}
        />
        <Grid
          container spacing={3}
          justify='center' className={classes.mainContent}
        >
          <Grid
            className={classes.leftBlock}
            item md={3}
          >
            <UserBaseInfo history={history} />
            <CreatePostDialog
              open={dialogOpen}
              snackBarHandler={snackBarHandler}
              closeDialogHandler={handleCloseDialog}
            />
            {
              posts.length > 0
              ? <Button
                variant='contained'
                size='medium'
                color='secondary'
                onClick={() => { setDialogOpen(true) }}
                className={classes.postButton}
              >
                Share my moment
              </Button>
              : <></>
            }
          </Grid>
          <Grid
            className={classes.centerBlock}
            item xs={10} sm={7} md={5}
          >
            {renderCenterBlockContent()}
            {
              isLoadingPosts
              ? <div className={classes.circularWrapper}>
                  <CircularProgress color='secondary' />
                </div>
              : <></>
            }
            {
              displayNewPostButton
              ? <Fab
                  variant='extended'
                  className={
                    scrollYPosition === SCROLL_Y_POSITION.Top
                    ? `${fabButtonClasses.newPostButtonRoot} ${fabButtonClasses.newPostButtonInitPosition}`
                    : `${fabButtonClasses.newPostButtonRoot} ${fabButtonClasses.newPostButtonScrollingPosition}`
                  }
                  onClick={handleNewPostButtonClick}
                >
                  New Posts
                </Fab>
              : <></>
            }
            <Fab
              size='medium'
              color='secondary'
              aria-label='Add'
              onClick={() => { setDialogOpen(true) }}
              className={
                `${fabButtonClasses.addPostButtonRoot} ${fabButtonClasses.addPostButtonForXsScreen}`
              }
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid
            className={classes.rightBlock}
            item sm={4} md={3}
          >
            <SuggestFriends
              history={history}
              snackBarHandler={snackBarHandler}
            />
            <Fab
              size='medium'
              color='secondary'
              aria-label='Add'
              onClick={handleOpenDialog}
              className={
                `${fabButtonClasses.addPostButtonRoot} ${fabButtonClasses.addPostButtonForSmScreen}`
              }
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}
