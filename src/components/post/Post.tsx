/* eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import Skeleton from '@material-ui/lab/Skeleton';

import Carousel, { Modal, ModalGateway } from 'react-images';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import { PostComments } from './PostComments';

import { MuiThemeProvider } from '@material-ui/core/styles';

import likePost from '../../lib/mutations/likePost';
import unlikePost from '../../lib/mutations/unlikePost';
import commentPost from '../../lib/mutations/commentPost';

import { MAIN_THEME } from '../../assets/styles/themes';
import { postStyle } from '../../assets/styles/post';
import { fullScreenCarouselStyles } from '../../assets/styles/carousel';

import {
  ERROR_MESSAGES,
  MAX_POST_CONTENT_DISPLAY_LENGTH,
  SNACKBAR_TYPES,
} from '../utils/constants';

import {
  collapsePostContent,
  formatTimeFromMiliseconds,
  postImageInlineStyle,
  setHrefForUserNameTitle,
} from '../utils/helpers';

import '../../assets/styles/carousel.scss';

interface PostProps {
  data: any;
  snackBarHandler: Function;
};

export const Post = (props: PostProps): JSX.Element => {
  const classes = postStyle(MAIN_THEME);
  const {
    data,
    snackBarHandler,
  } = props;

  const [ postContent, setPostContent ] = useState('');
  const [ favoriteClicked, setFavoriteClicked ] = useState(false);
  const [ canSendMessage, setCanSendMessage ] = useState(false);
  const [ numberLikes, setNumberLikes ] = useState(0);
  const [ comment, setComment ] = useState('');
  const [ postComments, setPostComments ] = useState([] as any[]);
  const [ imagesModalOpen, setImagesModalOpen ] = useState(false);
  const [ currentPostImageIndex, setCurrentPostImageIndex ] = useState(0);
  const [ isLoadingData, setIsLoadingData ] = useState(true);

  const [ likePostMutation ] = useMutation(likePost);
  const [ unlikePostMutation ] = useMutation(unlikePost);
  const [ commentPostMutation ] = useMutation(commentPost);

  useEffect(() => {
    const renderPostContent = () => {
      if (data.content.length > MAX_POST_CONTENT_DISPLAY_LENGTH) {
        setPostContent(data.content.substr(
          0, MAX_POST_CONTENT_DISPLAY_LENGTH - 3
        ) + '...');
      } else {
        setPostContent(data.content);
      }
    }

    if (data) {
      if (isLoadingData) {
        setIsLoadingData(false);
      }
      setNumberLikes(data.numberLikes);
      setFavoriteClicked(data.beLiked);
      setPostComments(data.comments);
      renderPostContent();
    }
  }, [ data ]);

  const handleInputOnChange = (evt: any) => {
    const newestComment = evt.target.value;

    setComment(newestComment);
    if (newestComment.length === 0) {
      setCanSendMessage(false);
    } else {
      setCanSendMessage(true);
    }
  }

  const handleCollapsePostContent = (event: any) => {
    event.preventDefault();

    setPostContent(collapsePostContent(postContent, data.content));
  }

  const handleFavoriteClick = async () => {
    let isSuccess = false;
    let resultType = 'likePost';

    if (favoriteClicked) {
      const result = await unlikePostMutation({
        variables: {
          postId: data.id,
        }
      });
      
      resultType = 'unlikePost';
      isSuccess = result.data.unlikePost.result;
    } else {
      const result = await likePostMutation({
        variables: {
          postId: data.id,
        }
      });

      isSuccess = result.data.likePost.result;
    }
    if (!isSuccess) {
      resultType === 'likePost'
      ? snackBarHandler(
        'open',
        SNACKBAR_TYPES.Error,
        ERROR_MESSAGES.Post.Like,
      )
      : snackBarHandler(
        'open',
        SNACKBAR_TYPES.Error,
        ERROR_MESSAGES.Post.UnLike,
      );
    }
  }

  const handleCommentPost = async () => {
    if (comment.length === 0) {
      return;
    }

    const response = await commentPostMutation({
      variables: {
        postId: data.id,
        commentContent: comment,
      }
    });

    if (response.data.commentPost.error) {
      snackBarHandler(
        'open',
        SNACKBAR_TYPES.Error,
        response.data.commentPost.message,
      );
    } else {
      setComment('');
    }
  }

  const handlePostImageClick = (imageIndex: number) => {
    setCurrentPostImageIndex(imageIndex);
    setImagesModalOpen(true)
  }

  const renderImages = (images: any) => {
    if (images.length === 1) {
      return (
        <CardMedia
          onClick={() => handlePostImageClick(0)}
          className={classes.media}
          image={images[0].source}
        />
      );
    } else if (images.length === 2) {
      return (
        <GridList cellHeight={160} cols={3}>
          <GridListTile cols={2}>
            <img
              key={0}
              onClick={() => handlePostImageClick(0)}
              style={postImageInlineStyle(images[0].source)}
            />
          </GridListTile>
          <GridListTile cols={1}>
            <img
              key={1}
              onClick={() => handlePostImageClick(1)}
              style={postImageInlineStyle(images[1].source)}
            />
          </GridListTile>
        </GridList>
      );
    } else if (images.length === 3) {
      return (
        <div className={classes.images}>
          <GridList cellHeight={200} cols={3}>
            <GridListTile cols={3}>
              <img
                key={0}
                onClick={() => handlePostImageClick(0)}
                style={postImageInlineStyle(images[0].source)}
              />
            </GridListTile>
          </GridList>
          <GridList cellHeight={200} cols={3}>
            <GridListTile cols={2}>
              <img
                key={1}
                onClick={() => handlePostImageClick(1)}
                style={postImageInlineStyle(images[1].source)}
              />
            </GridListTile>
            <GridListTile cols={1}>
              <img
                key={2}
                onClick={() => handlePostImageClick(2)}
                style={postImageInlineStyle(images[2].source)}
              />
            </GridListTile>
          </GridList>
        </div>
      );
    } else {
      return (
        <div className={classes.images}>
          <GridList cellHeight={200} cols={3}>
            <GridListTile cols={3}>
              <img
                key={0}
                onClick={() => handlePostImageClick(0)}
                style={postImageInlineStyle(images[0].source)}
              />
            </GridListTile>
          </GridList>
          <GridList cellHeight={200} cols={3}>
            <GridListTile cols={1}>
              <img
                key={1}
                onClick={() => handlePostImageClick(1)}
                style={postImageInlineStyle(images[1].source)}
              />
            </GridListTile>
            <GridListTile cols={2} className={classes.listTile}>
              // eslint-disable-next-line jsx-a11y/alt-text
              <img
                key={2}
                style={postImageInlineStyle(images[2].source)}
              />
              <div
                className={classes.imageCoverLayer}
                onClick={() => handlePostImageClick(2)}
              >
                <p className={classes.coverLayerText}>
                  {`+${images.length - 3}`}
                </p>
              </div>
            </GridListTile>
          </GridList>
        </div>
      );
    }
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <Card className={classes.card}>
        <CardHeader
          classes={{
            title: classes.cardHeaderTitle,
          }}
          avatar={
            isLoadingData
            ? <Skeleton animation='wave' variant='circle' width={60} height={60} />
            : <Avatar
              src={data.user.avatarURL}
              aria-label='recipe'
              alt='avatar'
              className={classes.avatar}
            />
          }
          action={
            <IconButton
              className={`${classes.iconButton} ${classes.settingButton}`}
              aria-label='settings'
            >
            </IconButton>
          }
          title={
            isLoadingData
            ? <Skeleton animation='wave' height={10} width={150} />
            : <a
              className={classes.userNameLink}
              href={setHrefForUserNameTitle(data.user.id)}
            >
              {data.user.userName}
            </a>
          }
          subheader={
            isLoadingData
            ? <Skeleton animation='wave' height={10} width={100} />
            : formatTimeFromMiliseconds(data.createdAt)
          }
        />
        <div className={classes.avatarInsetBoxShadow} />
        {
          isLoadingData
          ? <Skeleton animation='wave' variant='rect' className={classes.media} />
          : renderImages(data.images)
        }
        <ModalGateway>
          {
            imagesModalOpen && !isLoadingData ? (
              <Modal onClose={() => setImagesModalOpen(false)}>
                <Carousel
                  currentIndex={currentPostImageIndex}
                  styles={fullScreenCarouselStyles}
                  views={data.images.map((image: any) => ({
                    source: image.source,
                    caption: '',
                  }))}
                />
              </Modal>
            ) : <></>
          }
        </ModalGateway>
        <CardActions disableSpacing className={classes.cardActions}>
          {
            isLoadingData
            ? <Skeleton animation='wave' height={30} width={30} />
            : <IconButton
              className={classes.iconButton}
              onClick={handleFavoriteClick}
              aria-label='add to favorites'
            >
              {
                favoriteClicked
                ? <FavoriteIcon className={classes.iconFullBackground}/>
                : <FavoriteBorderIcon />
              }
            </IconButton>
          }
        </CardActions>
        <CardContent className={classes.cardContent}>
          {
            isLoadingData
            ? <Skeleton animation='wave' height={30} width={80} />
            : <div className={classes.likesInfor}>
              Liked by <b>{numberLikes}</b> people
            </div>
          }
          {
            isLoadingData
            ? <Skeleton animation='wave' height={30} width={80} />
            : <div className={classes.tagsList}>
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
          }
          {
            isLoadingData
            ? <Skeleton animation='wave' height={30} width={80} />
            : <Typography
                className={classes.postContent}
                variant='body2'
                component='p'
              >
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
              </Typography>
          }
          <div className={classes.postComments}>
            {
              isLoadingData
              ? <Skeleton animation='wave' height={30} width={80} />
              : <PostComments comments={postComments}/>
            }
          </div>
        </CardContent>
        <CardActions>
          <Paper component='form' className={classes.inputWrapper}>
            <InputBase
              className={classes.inputBase}
              value={comment}
              onChange={handleInputOnChange}
              multiline
              placeholder='Say something guy'
              inputProps={{ 'aria-label': 'comment to post' }}
            />
          </Paper>
          <IconButton
            type='submit'
            className={
              classes.iconButton + ' ' +
              classes.floatRightButton + ' ' +
              classes.sendMessButton + ' '
            }
            aria-label='search'
            onClick={handleCommentPost}
          >
            {
              !isLoadingData && canSendMessage
              ? <SendIcon />
              : <SendOutlinedIcon />
            }
          </IconButton>
        </CardActions>
      </Card>
    </MuiThemeProvider>
  );
}
