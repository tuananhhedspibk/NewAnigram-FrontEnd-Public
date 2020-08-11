import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import {
  FOLLOW_INFO_DIALOG_TITLES,
  GENERAL_MESSAGES,
  ROUTES,
} from '../utils/constants';

import { followInfoDialogStyle } from '../../assets/styles/followInfoDialog';
import { MAIN_THEME } from '../../assets/styles/themes';

interface FollowInfoDialogProps {
  data: any,
  open: boolean,
  handleClose: any,
  title: string,
};

export const FollowInfoDialog = (props: FollowInfoDialogProps) => {
  const {
    data,
    open,
    handleClose,
    title,
  } = props;
  const classes = followInfoDialogStyle(MAIN_THEME);

  const renderPlaceholderMessage = () => {
    switch (title) {
      case FOLLOW_INFO_DIALOG_TITLES.Followings: {
        return (
          <div className={classes.placeholderMessage}>
            {GENERAL_MESSAGES.Follow.NoFollowings}
          </div>
        );
      }
      case FOLLOW_INFO_DIALOG_TITLES.Followers: {
        return (
          <div className={classes.placeholderMessage}>
            {GENERAL_MESSAGES.Follow.NoFollowers}
          </div>
        )
      }
      default: {
        return '';
      }
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle
        className={classes.dialogTitle}
      >
        {title}
      </DialogTitle>
      <List className={classes.usersList}>
        {
          data && data.length > 0
          ? data.map((user: any) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  src={user.avatarURL}
                >
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={
                <a
                  className={classes.userNameLink}
                  href={`${ROUTES.Users}/${user.id}`}
                >
                  {user.userName}
                </a>
              } />
            </ListItem>
          ))
          : renderPlaceholderMessage()
        }
      </List>
    </Dialog>
  )
}
