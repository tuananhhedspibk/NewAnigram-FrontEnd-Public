/* eslint-disable no-fallthrough */

import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

import markNotificationAsRead from
  '../../lib/mutations/markNotificationAsRead';

import {
  markReadNotifyRequest,
  markReadNotifyFailed,
} from '../../redux/notify/actions';

import {
  NOTIFICATION_TYPES,
  ROUTES,
  GENERAL_MESSAGES,
} from '../utils/constants';
import { handleNotifyItemOnClick } from '../utils/helpers';

import {
  notificationSnackBarStyles
} from '../../assets/styles/notificationSnackBar';
import { MAIN_THEME } from '../../assets/styles/themes';

export const NotificationSnackBar = ({ ...props }) => {
  const classes = notificationSnackBarStyles(MAIN_THEME);

  const {
    children,
  } = props;
  const notificationDataParsed = JSON.parse(children);

  const dispatch = useDispatch();

  const [ markNotificationAsReadMutation ] =
    useMutation(markNotificationAsRead);

  const handleLinkClick = async (url: string) => {
    await handleNotifyItemOnClick(
      notificationDataParsed,
      markNotificationAsReadMutation,
      markReadNotifyRequest,
      markReadNotifyFailed,
      dispatch,
    );
    window.location.href = url;
  }

  const renderContent = () => {
    switch(notificationDataParsed.type) {
      case NOTIFICATION_TYPES.Follow: {
        return (
          <div className={classes.contentWrapper}>
            <p className={classes.title}>
              {notificationDataParsed.content}
            </p>
            <p className={classes.message}>
              {GENERAL_MESSAGES.Notification.Follow}
            </p>
            <button
              className={classes.link}
              onClick={() => handleLinkClick(
                `${ROUTES.Users}/${notificationDataParsed.follower}`
              )}
            >
              here
            </button>
          </div>
        );
      }
      case NOTIFICATION_TYPES.CommentPost: {
        
      }
      case NOTIFICATION_TYPES.LikePost: {
        
      }
      default: {
        return (
          <div className={classes.contentWrapper}>
            <p className={classes.title}>
              {notificationDataParsed.content}
            </p>
            <p className={classes.message}>
              {GENERAL_MESSAGES.Notification.Post}
            </p>
            <button
              className={classes.link}
              onClick={() => handleLinkClick(
                `${ROUTES.Posts}/${notificationDataParsed.post}`
              )}
            >
              here
            </button>
          </div>
        );
      }
    }
  }

  return (
    <Card className={classes.card}>
      <Paper>
        {renderContent()}
      </Paper>
    </Card>
  )
}
