import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';

import { NOTIFICATION_TYPES } from '../utils/constants';

import { formatTimeFromMiliseconds } from '../utils/helpers';

import { notitifcationMenuItemStyle } from
  '../../assets/styles/notificationMenuItem';
import { MAIN_THEME } from '../../assets/styles/themes';

interface NotificationMenuItemProps {
  data: any;
}

export const NotificationMenuItem = (props: NotificationMenuItemProps) => {
  const classes = notitifcationMenuItemStyle(MAIN_THEME);
  const { data } = props;

  const renderIcon = () => {
    switch (data.type) {
      case NOTIFICATION_TYPES.CommentPost: {
        return (
          <ChatIcon className={
            `${classes.icon} ${classes.iconChat}`
          }/>
        );
      }
      case NOTIFICATION_TYPES.LikePost: {
        return (
          <ThumbUpIcon className={
            `${classes.icon} ${classes.iconThumbs}`
          }/>
        );
      }
      case NOTIFICATION_TYPES.Follow: {
        return (
          <FaceIcon className={
            `${classes.icon} ${classes.iconFollow}`
          }/>
        );
      }
    }
  }

  return (
    <div className={
      data !== null
      ? (
        !data.read
        ? `${classes.root} ${classes.unreadVerticalMark}`
        : classes.root
      )
      : ''
    }>
      <section className={classes.leftSide}>
        {
          data !== null
          ? 
            <div className={classes.avatarBlock}>
              <img
                alt='notifi-img'
                className={classes.avatar}
                src={data.image}
              />
              <div className={classes.avatarInsetBoxShadow} />
            </div>
          : <Skeleton animation='wave' variant='circle' width={60} height={60} />
        }
      </section>
      <section className={classes.rightSide}>
        <p className={classes.content}>
        {
          data !== null
          ? data.content
          : <Skeleton animation='wave' height={10} width={150} />
        }
        </p>
        <section className={classes.timeStamp}>
          <p className={classes.iconWrapper}>
            {
              data !== null
              ? renderIcon()
              : <Skeleton animation='wave' variant='circle' width={10} height={10} />
            }
          </p>
          <p className={classes.timeData}>
            {
              data !== null
              ? formatTimeFromMiliseconds(data.createdAt)
              : <Skeleton animation='wave' height={10} width={150} />
            }
          </p>
        </section>
      </section>
    </div>
  );
}
