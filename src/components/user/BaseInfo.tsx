import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { FollowInfoDialog } from './FollowInfoDialog';

import fetchUser from '../../lib/queries/fetchUserBaseData';

import { MAIN_THEME } from '../../assets/styles/themes';
import { baseInfoStyle } from '../../assets/styles/baseInfo';

import {
  BATCH_AVATARS_SIZE,
  DEFAULT_IMAGES,
  ROUTES,
} from '../utils/constants';
import { getLocalStorageUserId } from '../utils/helpers';

interface UserBaseInfoProps {
  history: any,
};

export const UserBaseInfo = (props: UserBaseInfoProps): JSX.Element => {
  const classes = baseInfoStyle(MAIN_THEME);
  const { history } = props;

  const [ userData, setUserData ] = useState('' as any);
  const [ openFollowingDialog, setOpenFollowingDialog ] = useState(false);

  const userId = getLocalStorageUserId();

  const fetchUserResult = useQuery(fetchUser, {
    variables: {
      id: userId
    },
    fetchPolicy: 'no-cache',
    skip: userId === '',
  });

  useEffect(() => {
    if (fetchUserResult.data) {
      setUserData(fetchUserResult.data.user);
    }
  }, [ fetchUserResult ]);

  const handleUserNameClick = () => {
    history.push(`${ROUTES.Profile}`);
  }

  const renderAvatarsGroup = (users: any) => {
    const avatarComponents = users.map((user: any, index: any): any => {
      if (index < BATCH_AVATARS_SIZE
        || (index === users.length - 1 && users.length <= BATCH_AVATARS_SIZE)) {
        return (
          <Tooltip title={user.userName}>
            <Avatar
              className={classes.smallAvatar}
              key={index}
              src={user.avatarURL}
              onClick={() => history.push(`${ROUTES.Users}/${user.id}`)}
            />
          </Tooltip>
        );
      }
      if (index === BATCH_AVATARS_SIZE) {
        return (
          <Avatar
            onClick={() => setOpenFollowingDialog(true)}
            className={classes.smallAvatar}
          >
            +{users.length - BATCH_AVATARS_SIZE}
          </Avatar>
        );
      }
    });

    return (
      <AvatarGroup className={classes.avatarGroup}>
        {
          avatarComponents
        }
      </AvatarGroup>
    );
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <FollowInfoDialog
        data={userData.followings}
        open={openFollowingDialog}
        title='Followings'
        handleClose={() => setOpenFollowingDialog(false)}
      />
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <div className={classes.avatarBlock}>
            <Avatar
              src={
                userData !== ''
                ? userData.avatarURL
                : DEFAULT_IMAGES.Avatar
              }
              aria-label='recipe'
              alt='avatar'
              className={classes.avatar}
            />
            <div className={classes.boxShadowForAvatar}></div>
          </div>
          <List className={classes.basicInfoBlock}>
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={
                  userData !== ''
                  ? userData.userName
                  : 'User Name'
                }
                className={classes.listItemText}
                classes={{
                  primary: classes.userName,
                  secondary: classes.nickName,
                }}
                onClick={handleUserNameClick}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                    >
                      {
                        userData !== ''
                        ? userData.nickName
                        : 'Nick Name'
                      }
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </div>
        <CardContent className={classes.followPart}>
          <span className={classes.followInforTitle}>
            <p className={classes.followTitleNumber}>
              {
                userData !== ''
                ? userData.followers.length
                : 0
              }
            </p>
            <p className={classes.followTitleText}>
              followers
            </p>
          </span>
          {
            userData !== ''
            ? renderAvatarsGroup(userData.followers)
            : <></>
          }
        </CardContent>
        <div className={classes.divider}></div>
        <CardContent className={classes.followPart}>
          <span className={classes.followInforTitle}>
            <p className={classes.followTitleNumber}>
              {
                userData !== ''
                ? userData.followings.length
                : 0
              }
            </p>
            <p className={classes.followTitleText}>
              followings
            </p>
          </span>
          {
            userData !== ''
            ? renderAvatarsGroup(userData.followings)
            : <></>
          }
        </CardContent>
      </Card>
    </MuiThemeProvider>
  )
}
