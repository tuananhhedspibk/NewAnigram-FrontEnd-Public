import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchIcon from '@material-ui/icons/Search';

import { ApplicationBar } from '../shared/ApplicationBar';

import { authStateSelector } from '../../redux/selectors';

import FetchSuggestFriends from
  '../../lib/queries/fetchSuggestFriends';

import {
  BATCH_ITEMS_SIZE,
  DEFAULT_IMAGES,
  NUMBER_USERS_PER_ROW,
  ROUTES,
} from '../utils/constants';
import {
  handleLoadMoreData
} from '../utils/helpers';

import { MAIN_THEME } from '../../assets/styles/themes';
import { usersIndexStyle } from '../../assets/styles/usersIndex';

interface UsersIndexProps {
  history: any;
}

export const UsersIndex = (props: UsersIndexProps) => {
  const classes = usersIndexStyle(MAIN_THEME);
  const { history } = props;

  const [ pageTitle ] = useState(
    history.location.pathname === ROUTES.SuggestFriends
    ? 'Suggest Friends'
    : 'Found Users'
  );
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ keySearch, setKeySearch ] = useState('');
  const [
    lastShowingItemIndex,
    setLastShowingItemIndex
  ] = useState(BATCH_ITEMS_SIZE - 1);
  const [ loadMoreButtonText ] = useState(
    history.location.pathname === ROUTES.SuggestFriends
    ? 'More Friends'
    : 'More Users'
  );
  const fetchSuggestFriendsResult = useQuery(FetchSuggestFriends);
  const [ renderUsers, setRenderUsers ] = useState([] as any[]);
  const [ fetchedUsers, setFetchedUsers ] = useState([] as any[]);

  const authState = useSelector(authStateSelector);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.replace(ROUTES.SignIn);
    }
  }, [ authState.isAuthenticated, history ]);

  useEffect(() => {
    if (!fetchSuggestFriendsResult.loading) {
      const fetchedUsersResult =
        fetchSuggestFriendsResult.data.suggestFriends.users;

      setRenderUsers(fetchedUsersResult);
      setFetchedUsers(fetchedUsersResult)
    }
  }, [ fetchSuggestFriendsResult ]);

  const handleSearchBoxInputChange = (evt: any) => {
    const newKeySearch = evt.target.value;
    const newRenderUsers: any[] = [];

    setKeySearch(newKeySearch);

    fetchedUsers.forEach((user: any) => {
      if (
        user.userName.toLowerCase().includes(newKeySearch.toLowerCase())
      ) {
        newRenderUsers.push(user);
      }
    });

    if (newKeySearch.length > 0) {
      setLastShowingItemIndex(newRenderUsers.length - 1);
    } else {
      setLastShowingItemIndex(BATCH_ITEMS_SIZE - 1);
    }

    setRenderUsers(newRenderUsers);
  }

  const handleUserNameClick = (userId: string) => {
    history.push(`${ROUTES.Users}/${userId}`);
  }

  const renderSearchBox = () => {
    switch (history.location.pathname) {
      case ROUTES.SuggestFriends: {
        return (
          <div className={classes.header}>
            <p className={classes.pageTitle}>
              {pageTitle}
            </p>
            <Paper
              className={classes.searchBoxWrapper}
            >
              <InputBase
                className={
                  `${classes.textField} ${classes.filterSuggestFriends}`
                }
                placeholder='Tell us the name that you want to see'
                value={keySearch}
                onChange={evt => handleSearchBoxInputChange(evt)}
              />
            </Paper>
          </div>
        );
      }
      case ROUTES.Users: {
        return (
          <div className={classes.header}>
            <p className={classes.pageTitle}>
              {pageTitle}
            </p>
            <Paper
              className={classes.searchBoxWrapper}
            >
              <InputBase
                className={
                  `${classes.textField} ${classes.userNameSearchInput}`
                }
                placeholder='Tell us the name that you want to search'
              />
              <IconButton
                type='submit'
                className={classes.iconButton}
                aria-label='search'
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        );
      }
    }
  }

  const renderUserItems = () => {
    const results = [];

    for (let i = 0 ; i < renderUsers.length; i += NUMBER_USERS_PER_ROW) {
      const rowUserItems = [];

      for (let j = i; j < i + NUMBER_USERS_PER_ROW; j++) {
        if (j < renderUsers.length) {
          rowUserItems.push(
            <UserItem
              key={renderUsers[j].id}
              handleUserNameClick={handleUserNameClick}  
              userData={renderUsers[j]}
            />
          );
        }
      }

      results.push(
        <div className={
          i >= lastShowingItemIndex + 1
          ? classes.hiddenRow
          : classes.itemsRow
        }>
          {rowUserItems.map(item => item)}
        </div>
      );
    }

    return results;
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <div className={classes.root}>
        <ApplicationBar history={history} />
        {renderSearchBox()}
        <div className={classes.itemsList}>
          {
            renderUsers.length > 0
            ? renderUserItems()
            : fetchSuggestFriendsResult.loading
              ? <CircularProgress color='primary' />
              : <div className={classes.notFoundWrapper}>
                  <p className={classes.notfoundText}>
                    Not found any friends, sorry guys!
                  </p>
                  <img
                    alt='Not found'
                    className={classes.notfoundImg}
                    src={DEFAULT_IMAGES.NotFound}
                  />
                </div>
          }
        </div>
        {
          lastShowingItemIndex >= renderUsers.length - 1
          ? <></>
          : <div className={classes.loadMoreButtonWrapper}>
              <Button
                variant='contained'
                size='medium'
                color='primary'
                className={classes.loadMoreButton}
                onClick={() =>
                  handleLoadMoreData(
                    lastShowingItemIndex,
                    renderUsers.length,
                    setIsLoadingMore,
                    setLastShowingItemIndex,
                  )
                }
              >
                {
                  isLoadingMore
                  ? <CircularProgress color='primary' />
                  : loadMoreButtonText
                }
              </Button>
            </div>
        }
      </div>
    </MuiThemeProvider>
  )
}

interface UsersItemProps {
  handleUserNameClick: any;
  userData: any;
}

const UserItem = (props: UsersItemProps) => {
  const classes = usersIndexStyle(MAIN_THEME);
  const { handleUserNameClick, userData } = props;

  return (
    <div className={classes.itemRoot}>
      <div className={classes.itemLeftBlock}>
        <img
          className={classes.itemAvatar}
          alt='avatar'
          src={userData.avatarURL}
        />
      </div>
      <div className={classes.itemRightBlock}>
        <section className={classes.itemUserName}>
          <p
            onClick={() => handleUserNameClick(userData.id)}
            className={classes.itemUserNameText}
          >
            {userData.userName}
          </p>
        </section>
        <section className={classes.itemUserData}>
          <label className={classes.itemTextLabel}>
            Followers:
          </label>
          <p className={classes.itemTextData}>
            {userData.followers}
          </p>
        </section>
        <section className={classes.itemUserData}>
          <label className={classes.itemTextLabel}>
            Following:
          </label>
          <p className={classes.itemTextData}>
            {userData.following}
          </p>
        </section>
        <section className={classes.itemUserData}>
          <label className={classes.itemTextLabel}>
            Posts:
          </label>
          <p className={classes.itemTextData}>
            {userData.posts}
          </p>
        </section>
      </div>
    </div>
  )
}
