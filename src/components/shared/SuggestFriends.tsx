import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

import { MuiThemeProvider } from '@material-ui/core/styles';

import followUser from '../../lib/mutations/followUser';
import unfollowUser from '../../lib/mutations/unfollowUser';

import FetchSuggestFriends from
  '../../lib/queries/fetchSuggestFriendsWithoutPostsInfo';

import {
  PopupStatus,
  ROUTES,
  SNACKBAR_TYPES,
} from '../utils/constants';
import { handleLinkClick } from '../utils/helpers';

import { MAIN_THEME } from '../../assets/styles/themes';
import { suggestFriendStyle } from '../../assets/styles/suggestFriends';

interface SuggestFriendProps {
  history: any;
  snackBarHandler: Function;
}

export const SuggestFriends = (props: SuggestFriendProps) => {
  const classes = suggestFriendStyle(MAIN_THEME);
  const { history, snackBarHandler } = props;

  const [ suggestFriends, setSuggestFriends ] = useState([]);
  const [
    isHandlingFollowUsers,
    setIsHandlingFollowUsers,
  ] = useState([] as boolean[]);
  const [
    isFollowingUsers,
    setIsFollowingUsers,
  ] = useState([] as boolean[]);

  const fetchSuggestFriendsResult = useQuery(FetchSuggestFriends, {
    variables: {
      limit: 3,
    }
  });

  const [ followUserMutation ] = useMutation(followUser);
  const [ unfollowUserMutation ] = useMutation(unfollowUser);

  useEffect(() => {
    if (!fetchSuggestFriendsResult.loading) {
      const suggestFriends =
        fetchSuggestFriendsResult.data.suggestFriends.users;
      const followStateDefaultValues: boolean[] = [];

      setSuggestFriends(suggestFriends);
      
      for(let i = 0; i < suggestFriends.length; i++) {
        followStateDefaultValues.push(false);
      }

      setIsHandlingFollowUsers(followStateDefaultValues);
      setIsFollowingUsers(followStateDefaultValues);
    }
  }, [ fetchSuggestFriendsResult ]);

  const handleFollowUser = async (userIndex: number, userId: string) => {
    let newIsHandlingFollowUsers = isHandlingFollowUsers.slice();
    newIsHandlingFollowUsers[userIndex] = true;

    setIsHandlingFollowUsers(newIsHandlingFollowUsers);

    const response = await followUserMutation({
      variables: {
        followingUserId: userId,
      }
    });

    newIsHandlingFollowUsers = newIsHandlingFollowUsers.slice();
    newIsHandlingFollowUsers[userIndex] = false;

    setIsHandlingFollowUsers(newIsHandlingFollowUsers);

    if (response.data.followUser.result) {
      let newIsFollowingUsers = isFollowingUsers.slice();
      newIsFollowingUsers[userIndex] = true;

      setIsFollowingUsers(newIsFollowingUsers);

      snackBarHandler(
        PopupStatus.Open,
        SNACKBAR_TYPES.Success,
        response.data.followUser.message,
      );
    } else {
      snackBarHandler(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        response.data.followUser.message,
      );
    }
  }

  const handleUnFollowUser = async (userIndex: number, userId: string) => {
    let newIsHandlingFollowUsers = isHandlingFollowUsers.slice();
    newIsHandlingFollowUsers[userIndex] = true;

    setIsHandlingFollowUsers(newIsHandlingFollowUsers);

    const response = await unfollowUserMutation({
      variables: {
        unfollowUserId: userId,
      }
    });

    newIsHandlingFollowUsers = newIsHandlingFollowUsers.slice();
    newIsHandlingFollowUsers[userIndex] = false;

    setIsHandlingFollowUsers(newIsHandlingFollowUsers);

    if (response.data.unfollowUser.result) {
      let newIsFollowingUsers = isFollowingUsers.slice();
      newIsFollowingUsers[userIndex] = false;

      setIsFollowingUsers(newIsFollowingUsers);

      snackBarHandler(
        PopupStatus.Open,
        SNACKBAR_TYPES.Success,
        response.data.unfollowUser.message,
      );
    } else {
      snackBarHandler(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        response.data.unfollowUser.message,
      );
    }
  }

  const handleFollowIconClick = (userIndex: number, userId: string) => {
    if (isFollowingUsers[userIndex]) {
      handleUnFollowUser(userIndex, userId);
    } else {
      handleFollowUser(userIndex, userId);
    }
  }

  const handleUserNameClick = (userId: string) => {
    history.push(`${ROUTES.Users}/${userId}`);
  }

  const renderSuggestUsers = () => {
    const sgFriendsComponents =
      suggestFriends.map((sgFriend: any, index: number) => (
        <div>
          <div className={classes.divider}></div>
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar
                alt='Suggest Friend 1'
                src={sgFriend.avatarURL}
              />
            </ListItemAvatar>
            <ListItemText
              classes={{
                primary: classes.listItemPrimaryText,
                secondary: classes.listItemSecondaryText,
              }}
              onClick={() => handleUserNameClick(sgFriend.id)}
              primary={sgFriend.userName}
              secondary={
                <React.Fragment>
                  <Typography
                    className={classes.secondaryTextItem}
                    component='span'
                    variant='body2'
                  >
                    {`Followers: ${sgFriend.followers}`}
                  </Typography>
                  <Typography
                    className={classes.secondaryTextItem}
                    component='span'
                    variant='body2'
                  >
                    {`Followings: ${sgFriend.following}`}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              {
                isHandlingFollowUsers[index]
                ? <CircularProgress />
                : <IconButton
                    className={classes.followButton}
                    onClick={() => handleFollowIconClick(index, sgFriend.id)}
                    aria-label='follow'
                  >
                    {
                      isFollowingUsers[index]
                      ? <PersonAddDisabledIcon />
                      : <PersonAddOutlinedIcon />
                    }
                  </IconButton>
              }
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      ))

    return (
      <div>
        {sgFriendsComponents}
      </div>
    );
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <Card className={classes.card}>
        <List className={classes.list}>
          <ListItem alignItems='flex-start'>
            <Typography variant='h6' className={classes.title}>
              New friends for you
            </Typography>
            <ListItemSecondaryAction>
              <button
                className={classes.seeAllLink}
                onClick={
                  () => handleLinkClick(history, ROUTES.SuggestFriends)
                }
              >
                See all
              </button>
            </ListItemSecondaryAction>
          </ListItem>
          {renderSuggestUsers()}
        </List>
      </Card>
    </MuiThemeProvider>
  );
}
