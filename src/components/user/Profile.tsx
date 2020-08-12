import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import PersonOutline from '@material-ui/icons/PersonOutline';
import Check from '@material-ui/icons/Check';
import ViewCarousel from '@material-ui/icons/ViewCarousel';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { FollowInfoDialog } from './FollowInfoDialog';
import { PostModal } from '../post/PostModal';
import { ApplicationBar } from '../shared/ApplicationBar';
import { AlertSnackBar } from '../shared/AlertSnackBar';

import { authStateSelector } from '../../redux/selectors';

import fetchUser from '../../lib/queries/fetchUserFullData';
import isFollowingUser from '../../lib/queries/isFollowingUser';
import followUser from '../../lib/mutations/followUser';
import unfollowUser from '../../lib/mutations/unfollowUser';

import {
  BATCH_ITEMS_SIZE,
  NUMBER_POSTS_PER_ROW,
  DEFAULT_IMAGES,
  GRID_POSTS_RATIO,
  ROUTES,
  SNACKBAR_TYPES,
  PopupStatus,
} from '../utils/constants';
import {
  getLocalStorageUserId,
  getRandomInt,
  handleSnackBar,
  handleLoadMoreData,
} from '../utils/helpers';

import { profileStyle } from '../../assets/styles/profile';
import { MAIN_THEME } from '../../assets/styles/themes';

import '../../assets/styles/custom.scss';

interface ProfileProps {
  history: any,
};

export const UserProfile = (props: ProfileProps) => {
  const { history } = props;
  const classes = profileStyle(MAIN_THEME);

  const [ openFollowingDialog, setOpenFollowingDialog ] = useState(false);
  const [ openFollowersDialog, setOpenFollowersDialog ] = useState(false);
  const [ data, setData ] = useState(undefined as any);
  const [ isMyProfile, setIsMyProfile ] = useState(true);
  const [ isFollowingCurrentUser, setIsFollowingCurrentUser ] = useState(false);
  const [ isFollowHandling, setIsFollowHandling ] = useState(false);
  const [ postModalOpen, setPostModalOpen ] = useState(false);
  const [ choosingPostIndex, setChoosingPostIndex ] = useState(0);
  const [
    lastShowingItemIndex,
    setLastShowingItemIndex
  ] = useState(BATCH_ITEMS_SIZE - 1);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const authState = useSelector(authStateSelector);

  const localStorageUserId = getLocalStorageUserId();

  const getCurrentUserId = () => {
    const path = history.location.pathname.split('/')[1];

    if (path === 'mypage') {
      return localStorageUserId;
    } else if (path === 'users') {
      const profileUserId = history.location.pathname.split('/')[2];
      return profileUserId;
    }
  }

  const [ currentUserId ] = useState(getCurrentUserId());

  const fetchCurrentUserResult = useQuery(fetchUser, {
    variables: {
      id: currentUserId,
    }
  });
  const isFollowingUserResult = useQuery(isFollowingUser, {
    variables: {
      userId: currentUserId,
    }
  });

  const [ followUserMutation ] = useMutation(followUser);
  const [ unfollowUserMutation ] = useMutation(unfollowUser);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push(ROUTES.SignIn);
    } else {
      if (currentUserId !== localStorageUserId) {
        setIsMyProfile(false);
      } else {
        history.replace(ROUTES.Profile);
      }

      if (fetchCurrentUserResult.data) {
        setData(fetchCurrentUserResult.data.user);
      }

      if (isFollowingUserResult.data) {
        setIsFollowingCurrentUser(
          isFollowingUserResult.data.isFollowingUser.result
        );
      }
    }
  }, [
    authState.isAuthenticated,
    history,
    fetchCurrentUserResult,
    isFollowingUserResult,
    currentUserId,
    localStorageUserId,
  ]);

  const handleCloseFollowingDialog = () => {
    setOpenFollowingDialog(false);
  }

  const handleCloseFollowersDialog = () => {
    setOpenFollowersDialog(false);
  }

  const handlePostClick = (postIndex: number) => {
    setChoosingPostIndex(postIndex);
    setPostModalOpen(true);
  }

  const handleFollowUser = async () => {
    setIsFollowHandling(true);

    const response = await followUserMutation({
      variables: {
        followingUserId: currentUserId,
      }
    });

    setIsFollowHandling(false);

    if (response.data.followUser.result) {
      setIsFollowingCurrentUser(true);
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Success,
        response.data.followUser.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    } else {
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        response.data.followUser.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    }
  }

  const handleUnfollowUser = async () => {
    setIsFollowHandling(true);

    const response = await unfollowUserMutation({
      variables: {
        unfollowUserId: currentUserId,
      }
    });

    setIsFollowHandling(false);

    if (response.data.unfollowUser.result) {
      setIsFollowingCurrentUser(false);
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Success,
        response.data.unfollowUser.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    } else {
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        response.data.unfollowUser.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    }
  }

  const renderSuffixSpaces = (numberSpaces: number) => {
    const results = [];
    for (let i = 0; i < numberSpaces; i++) {
      results.push(
        <Grid item xs='auto' className={classes.suffixSpaceWrapper}>
          <div className={classes.imageSuffixSpace} />
        </Grid>
      )
    }

    return results;
  }

  const renderPost = (post: any, postImgClass: any) => {
    return (
      <div
        className={
          postImgClass === classes.ratioOneImage
          ? classes.profilePostRatioOneWrapper
          : classes.profilePostRatioTwoWrapper
        }
        onClick={() => handlePostClick(post.postIndex)}
      >
        <div className='profile-post-body'>
          {
            post.hasMultipleImages
            ? <ViewCarousel className={classes.imgCarouselIcon} />
            : <></>
          }
          <img
            alt='img'
            className={postImgClass}
            src={post.firstImgSrc}
          />
        </div>
      </div>
    )
  }

  const renderRowPostsByRatio = (posts: any, ratio: string, hidden = false) => {
    switch (ratio) {
      case '1:1:1': {
        return (
          <Grid
            container
            justify='center'
            className={hidden ? classes.hiddenGrid : ''}
          >
            {
              posts.map((post: any) => (
                <Grid item xs='auto'>
                  {renderPost(post, classes.ratioOneImage)}
                </Grid>
              ))
            }
            {
              posts.length < NUMBER_POSTS_PER_ROW
              ? renderSuffixSpaces(NUMBER_POSTS_PER_ROW - posts.length)
              : ''
            }
          </Grid>
        );
      }
      case '1:2': {
        return (
          <Grid
            container
            justify='center'
            className={hidden ? classes.hiddenGrid : ''}
          >
            <Grid item xs='auto'>
              {renderPost(posts[0], classes.ratioOneImage)}
              {renderPost(posts[1], classes.ratioOneImage)}
            </Grid>
            <Grid item xs='auto'>
              {renderPost(posts[2], classes.ratioTwoImage)}
            </Grid>
          </Grid>
        );
      }
      case '2:1': {
        return (
          <Grid
            container
            justify='center'
            className={hidden ? classes.hiddenGrid : ''}
          >
            <Grid item xs='auto'>
              {renderPost(posts[0], classes.ratioTwoImage)}
            </Grid>
            <Grid item xs='auto'>
              {renderPost(posts[1], classes.ratioOneImage)}
              {renderPost(posts[2], classes.ratioOneImage)}
            </Grid>
          </Grid>
        );
      }
    }
  }

  const renderPosts = (posts: any) => {
    const results = [];
    for (let i = 0; i < posts.length; i += NUMBER_POSTS_PER_ROW) {
      let rowPostUpperIndex = i + NUMBER_POSTS_PER_ROW;
      let gridPostsRatio = GRID_POSTS_RATIO[getRandomInt(NUMBER_POSTS_PER_ROW)];
      const rowPosts = [];

      if (i + NUMBER_POSTS_PER_ROW >= posts.length) {
        rowPostUpperIndex = posts.length;
        gridPostsRatio = GRID_POSTS_RATIO[0]; // 1:1:1
      }

      for (let j = i; j < rowPostUpperIndex; j++) {
        rowPosts.push({
          postIndex: j,
          firstImgSrc: posts[j].images[0].source,
          hasMultipleImages: posts[j].images.length > 1,
        });
      }
      if (i >= lastShowingItemIndex + 1) {
        results.push(renderRowPostsByRatio(rowPosts, gridPostsRatio, true));
      } else {
        results.push(renderRowPostsByRatio(rowPosts, gridPostsRatio));
      }
    }

    return results;
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <div className={classes.bodyWrapper}>
        <ApplicationBar history={history} />
        <PostModal
          data={
            data !== undefined
              && data.posts !== undefined
              && data.posts.length > 0
            ? data.posts[choosingPostIndex]
            : null
          }
          open={postModalOpen}
          handleClose={() => setPostModalOpen(false)}
        />
        <AlertSnackBar
          message={snackBarMessage}
          type={snackBarType}
          open={snackBarOpen}
          handleClose={() => setSnackBarOpen(false)}
        />
        <div className={classes.mainBody}>
        <Grid
          className={classes.upperBlock}
          container
          justify='center'
        >
          <Grid item md={2} className={classes.upperLeft}>
            <div className={classes.avatarBlock}>
              <Avatar
                src={data !== undefined ? data.avatarURL : DEFAULT_IMAGES.Avatar}
                aria-label='recipe'
                alt='avatar'
                className={classes.avatar}
              />
              <div className={classes.avatarInsetBoxShadow} />
            </div>
          </Grid>
          <Grid item md={5} className={classes.upperRight}>
            <div className={classes.textBlock}>
              <p className={classes.userName}>
                { data !== undefined ? data.userName : 'User Name' }
              </p>
              <p className={classes.nickName}>
                { data !== undefined ? data.nickName : 'Nick Name' }
              </p>
            </div>
            {
              isMyProfile
              ? <Button
                  variant='outlined'
                  size='medium'
                  color='primary'
                  className={classes.upperRightButton}
                  onClick={() => history.push(ROUTES.Settings)}
                >
                  Edit my profile
                </Button>
              : isFollowingCurrentUser
                ? <Button
                    variant='outlined'
                    size='medium'
                    color='primary'
                    className={`${classes.upperRightButton}`}
                    onClick={handleUnfollowUser}
                  >
                    {
                      isFollowHandling
                      ? <CircularProgress color='primary' />
                      : <div className={classes.buttonIcons}>
                          <PersonOutline />
                          <Check />
                        </div>
                    }
                  </Button>
                : <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    className={
                      `${classes.upperRightButton} ${classes.containedButton}`
                    }
                    onClick={handleFollowUser}
                  >
                    {
                      isFollowHandling
                      ? <CircularProgress color='primary' />
                      : 'Follow'
                    }
                  </Button>
            }
          </Grid>
        </Grid>
        <Paper className={classes.basicInfoBlock}>
          <div className={classes.info}>
            <div
              onClick={() => setOpenFollowingDialog(true)}
              className={classes.infoContent}
            >
              <p className={classes.infoValue}>
              {
                  data !== undefined
                  ? data.followings.length
                  : 0
                }
              </p>
              <p className={classes.infoTitle}>
                following
              </p>
            </div>
          </div>
          <div className={classes.info}>
            <div
              onClick={() => setOpenFollowersDialog(true)}
              className={classes.infoContent}
            >
              <p className={classes.infoValue}>
                {
                  data !== undefined
                  ? data.followers.length
                  : 0
                }
              </p>
              <p className={classes.infoTitle}>
                followers
              </p>
            </div>
          </div>
          <div className={classes.info}>
            <p className={classes.infoValue}>
              {
                data !== undefined
                ? data.posts.length
                : 0
              }
            </p>
            <p className={classes.infoTitle}>
              post(s)
            </p>
          </div>
        </Paper>
        {
          data !== undefined
          ? renderPosts(data.posts)
          : <></>
        }
        <div className={classes.loadMoreButtonWrapper}>
          {
            data !== undefined
            ? (
              lastShowingItemIndex === data.posts.length - 1
                || data.posts.length < BATCH_ITEMS_SIZE
              ? <p className={classes.endingSpace} />
              : <Button
                  variant='contained'
                  size='medium'
                  color='primary'
                  className={classes.loadMoreButton}
                  onClick={() => 
                    handleLoadMoreData(
                      lastShowingItemIndex,
                      data.posts.length,
                      setIsLoadingMore,
                      setLastShowingItemIndex,
                    )
                  }
                >
                  {
                    isLoadingMore
                    ? <CircularProgress color='primary' />
                    : 'More Images'
                  }
                </Button>
            )
            : <></>
          }
        </div>
      </div>
        {
          data !== undefined
          ? <FollowInfoDialog
              data={data.followings}
              open={openFollowingDialog}
              title='Followings'
              handleClose={handleCloseFollowingDialog}
            />
          : <></>
        }
        {
          data !== undefined
          ? <FollowInfoDialog
              data={data.followers}
              open={openFollowersDialog}
              title='Followers'
              handleClose={handleCloseFollowersDialog}
            />
          : <></>
        }
      </div>
    </MuiThemeProvider>
  );
}
