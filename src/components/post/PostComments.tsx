import React, { useState, useEffect } from 'react';

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import IconButton from '@material-ui/core/IconButton';

import { postCommentsStyle } from
  '../../assets/styles/postComments';
import { MAIN_THEME } from '../../assets/styles/themes';

import { BATCH_COMMENTS_SIZE } from '../utils/constants';

import {
  setHrefForUserNameTitle,
} from '../utils/helpers';

interface PostCommentProps {
  comments: any;
}

export const PostComments = (props: PostCommentProps) => {
  const classes = postCommentsStyle(MAIN_THEME);
  const {
    comments
  } = props;

  const [ oldestPostIndex, setOldestPostIndex ] = useState(-6);

  useEffect(() => {
    if (comments) {
      if (comments.length > BATCH_COMMENTS_SIZE) {
        if (oldestPostIndex === -6) {
          setOldestPostIndex(comments.length - BATCH_COMMENTS_SIZE);
        }
      } else {
        setOldestPostIndex(-6);
      }
    }
  }, [ comments ]);

  const renderComments = () => {
    return (
      comments.map((comment: any, index: number) => {
        if (index >= oldestPostIndex) {
          return (
            <div className={classes.comment} key={index}>
              <img
                alt='comment user avatar'
                className={classes.userAvatar}
                src={comment.user.avatarURL}
              />
              <a
                href={setHrefForUserNameTitle(comment.user.id)}
                className={classes.userName}
              >
                {comment.user.userName}
              </a>
              <p className={classes.commentContent}>
                {comment.content}
              </p>
            </div>
          );
        } else {
          return <></>;
        }
      })
    );
  }

  const expandCommentsList = () => {
    setOldestPostIndex(oldestPostIndex - BATCH_COMMENTS_SIZE);
  }

  return (
    <div className={classes.comments}>
      {
        oldestPostIndex > 0
        ? <div className={classes.iconButtonWrapper}>
            <IconButton
              className={classes.iconButton}
              onClick={expandCommentsList}
            >
              <UnfoldMoreIcon className={classes.icon} />
            </IconButton>
          </div>
        : <></>
      }
      {renderComments()}
    </div>
  )
}
