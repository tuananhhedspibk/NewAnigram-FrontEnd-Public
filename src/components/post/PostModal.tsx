import React, { useState, useEffect } from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';

import { PostComments } from './PostComments';

import {
  MAX_POST_CONTENT_DISPLAY_LENGTH,
} from '../utils/constants';

import {
  collapsePostContent,
  formatTimeFromMiliseconds,
} from '../utils/helpers';

import { postModalStyle } from
  '../../assets/styles/postModal';
import { MAIN_THEME } from '../../assets/styles/themes';

import '../../assets/styles/postModal.scss';

interface PostModalProps {
  data: any;
  handleClose: any;
  open: boolean;
}

export const PostModal = (props: PostModalProps) => {
  const classes = postModalStyle(MAIN_THEME);
  const {
    data,
    handleClose,
    open,
  } = props;

  const [ postContent, setPostContent ] = useState('');

  useEffect(() => {
    if (data) {
      if (data.content.length > MAX_POST_CONTENT_DISPLAY_LENGTH) {
        setPostContent(data.content.substr(
          0, MAX_POST_CONTENT_DISPLAY_LENGTH - 3
        ) + '...');
      } else {
        setPostContent(data.content);
      }
    }
  }, [ data ]);

  const handleCollapsePostContent = (event: any) => {
    event.preventDefault();

    setPostContent(collapsePostContent(postContent, data.content));
  }

  const renderImages = () => {
    if (data.images.length > 1) {
      return (
        <GridList
          className={
            data.images.length === 2
            ? `${classes.gridList} ${classes.gridListContentCenter}`
            : `${classes.gridList}`
          }
          cols={2.5}
        >
          {
            data.images.map((image: any, index: number) => (
              <GridListTile
                key={image.source}
              >
                <img
                  src={image.source}
                  alt={`img-${index}`}
                />
              </GridListTile>
            ))
          }
        </GridList>
      )
    } else {
      return (
        <div>
          <img
            className={classes.image}
            src={data.images[0].source}
            alt='img-1'
          />
        </div>
      );
    }
  }

  const renderPostData = () => {
    return (
      <div className={classes.main}>
        <div className={classes.postImages}>
          {renderImages()}
        </div>
        <div className={classes.postBody}>
          <div className={classes.numeralData}>
            <div className={classes.activityInfor}>
              <section className={classes.activitySection}>
                <FavoriteIcon className={classes.iconRedBackground}/>
                <p className={classes.activityData}>
                  {data.numberLikes}
                </p>
              </section>
              <section className={classes.activitySection}>
                <MessageIcon className={classes.iconGreenBackground}/>
                <p className={classes.activityData}>
                  {data.comments.length}
                </p>
              </section>
            </div>
            <p className={classes.timeStamp}>
              {formatTimeFromMiliseconds(data.createdAt)}
            </p>
          </div>
          <div className={classes.tagsList}>
            {
              data.tags.map((tag: string, index: number) => (
                <Chip
                  key={index}
                  className={classes.tag}
                  variant='outlined'
                  size='small'
                  label={tag}
                />
              ))
            }
          </div>
          <p className={classes.postContent}>
            {postContent}
            {
              data.content.length > 55
              ? <button
                  className={classes.collapseLink}
                  onClick={handleCollapsePostContent}
                >
                  {
                    postContent.length > 55
                    ? 'show less'
                    : 'show more'
                  }
                </button>
              : <></>
            }
          </p>
          <div className={classes.postComments}>
            <PostComments comments={data.comments}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      {
        data !== null
        ? renderPostData()
        : <></>
      }
    </Dialog>
  );
}
