import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ImageCropper } from '../shared/ImageCropper';
import { DropZone } from '../shared/DropZone';
import { ImagePreviewer } from './ImagePreviewer';

import genS3PutURL from '../../lib/mutations/genS3PutURL';
import genS3GetURL from '../../lib/mutations/genS3GetURL';
import createPost from '../../lib/mutations/createPost';

import {
  pushImageToS3,
  logger,
  randomId,
  hashString,
} from '../utils/helpers';
import {
  ERROR_MESSAGES,
  LOG_TYPES,
  SNACKBAR_TYPES,
  SUCCESS_MESSAGES,
  USER_INFO,
  PopupStatus,
} from '../utils/constants';

import { createPostDialogStyle } from
  '../../assets/styles/createPostDialog';
import { MAIN_THEME } from '../../assets/styles/themes';

interface CreatePostDialogProps {
  open: boolean;
  closeDialogHandler: Function;
  snackBarHandler: Function;
};

export const CreatePostDialog = (props: CreatePostDialogProps) => {
  const classes = createPostDialogStyle(MAIN_THEME);
  const {
    open,
    closeDialogHandler,
    snackBarHandler,
  } = props;

  const [ tags, setTags ] = useState([] as string[]);
  const [ isCreatingPost, setIsCreatingPost ] = useState(false);
  const [ uploadedImages, setUploadedImages ] = useState([] as File[]);
  const [ imageS3PutURLs, setImageS3PutURLs ] = useState([] as string[]);
  const [ imageS3GetURLs, setImageS3GetURLs ] = useState([] as string[]);
  const [ tagInputValue, setTagInputValue ] = useState('');
  const [ content, setContent ] = useState('');
  const [ newPostId, setNewPostId ] = useState('');
  const [ imageCropperOpen, setImageCropperOpen ] = useState(false);
  const [ tmpUploadedImg, setTmpUploadedImg ] = useState(null as any);
  const [ croppedImage, setCroppedImage ] = useState(null as any);

  const [ createPostMutation ] = useMutation(createPost);
  const [ genS3PutURLMutation ] = useMutation(genS3PutURL);
  const [ genS3GetURLMutation ] = useMutation(genS3GetURL);

  let tagInput: any = null;

  useEffect(() => {
    if (croppedImage) {
      handleCloseImageCropper();
      handleCroppedImage(croppedImage);
    }
  }, [ croppedImage ]);

  const handleDeleteTag = (tagToDelete: string) => () => {
    const newTags = tags.filter(tag => tag !== tagToDelete)
    setTags(newTags);

    if (newTags.length === 0) {
      tagInput.focus();
      setTagInputValue('');
    }
  }

  const handleTagInputCharacter = (evt: any) => {
    const lastCharacterCode = evt.which;

    if (lastCharacterCode === 32 || lastCharacterCode === 13) {
      if (tagInputValue.trim().length > 0) {
        tags.push(tagInputValue);
        setTags(tags);
        setTagInputValue('');
      }
    }
  }

  const handleSubmit = async () => {
    if (uploadedImages.length === 0) {
      snackBarHandler(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        ERROR_MESSAGES.Post.NoImages,
      );
      return;
    }
    setIsCreatingPost(true);
    const pushImagesTask = imageS3PutURLs.map((url, index) => (
      pushImageToS3(url, uploadedImages[index], {
        params: {
          Key: uploadedImages[index].name,
          ContentType: uploadedImages[index].type,
        },
        headers: {
          'Content-Type': uploadedImages[index].type,
        }
      })
    ));

    await Promise.all(pushImagesTask)
      .then(async (_res) => {
        const response = await createPostMutation({
          variables: {
            id: newPostId,
            content,
            tags,
            images: imageS3GetURLs,
          }
        });
        setIsCreatingPost(false);

        if (response.data.createPost.result) {
          snackBarHandler(
            PopupStatus.Open,
            SNACKBAR_TYPES.Success,
            SUCCESS_MESSAGES.Post.Create
          );
          handleResetState();
          closeDialogHandler();
        } else {
          snackBarHandler(
            PopupStatus.Open,
            SNACKBAR_TYPES.Error,
            ERROR_MESSAGES.Post.Create
          );
        }
      })
      .catch(err => {
        snackBarHandler(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          ERROR_MESSAGES.Post.Create
        );

        logger(LOG_TYPES.Error, 'handleSubmit-CreatePostDialog', err);
      });
  }

  const handleTagInputChange = (evt: any) => {
    setTagInputValue(evt.target.value);
  }

  const handleContentInputChange = (evt: any) => {
    setContent(evt.target.value);
  }

  const handleCroppedImage = async (image: File) => {
    let postId = '';
    const currentTimeStamp = new Date().getTime();
    const hashedImageName =
      `${hashString(image.name + currentTimeStamp)}.${image.type.split('/')[1]}`;

    if (newPostId === '') {
      postId = randomId();
      setNewPostId(postId);
    } else {
      postId = newPostId;
    }

    const userId =
      JSON.parse(localStorage.getItem(USER_INFO) as string).id;
    const tasks = [
      genS3PutURLMutation({
        variables: {
          key: `users/${userId}/posts/${postId}/${hashedImageName}`,
          contentType: image.type,
        }
      }),
      genS3GetURLMutation({
        variables: {
          key: `users/${userId}/posts/${postId}/${hashedImageName}`,
        }
      })
    ];
    await Promise.all(tasks)
      .then(results => {
        const resForPutURL = results[0];
        const resForGetURL = results[1];

        if (resForPutURL.data.s3PutURL.result) {
          const imageS3URL = resForPutURL.data.s3PutURL.url;
          const newestImagesS3PutURLs = imageS3PutURLs.slice(0);

          newestImagesS3PutURLs.push(imageS3URL);
          setImageS3PutURLs(newestImagesS3PutURLs);
        }

        if (resForGetURL.data.s3GetURL.result) {
          const imageS3URL = resForGetURL.data.s3GetURL.url;
          const newestImagesS3GetURLs = imageS3GetURLs.slice(0);

          newestImagesS3GetURLs.push(imageS3URL);
          setImageS3GetURLs(newestImagesS3GetURLs);
        }

        const newestUploadedImages = uploadedImages.slice(0);
        newestUploadedImages.push(image);
        setUploadedImages(newestUploadedImages);

        setCroppedImage(null);
      })
      .catch(err => 
        logger(
          LOG_TYPES.Error,
          'handleCroppedImage-CreatePostDialog',
          err
        )
      );
  }

  const handleUploadImage = async (image: File) => {
    setImageCropperOpen(true);
    setTmpUploadedImg(image as any);
  }

  const handleRemoveImage = (index: number) => {
    let newestUploadedImages = uploadedImages.slice(0);
    let newestImagesS3PutURLs = imageS3PutURLs.slice(0);
    let newestImagesS3GetURLs = imageS3GetURLs.slice(0);

    newestUploadedImages.splice(index, 1);
    newestImagesS3PutURLs.splice(index, 1);
    newestImagesS3GetURLs.splice(index, 1);

    setUploadedImages(newestUploadedImages);
    setImageS3PutURLs(newestImagesS3PutURLs);
    setImageS3GetURLs(newestImagesS3GetURLs);
  }

  const handleResetState = () => {
    setTags([]);
    setUploadedImages([]);
    setImageS3PutURLs([]);
    setImageS3GetURLs([]);
    setTagInputValue('');
    setContent('');
    setNewPostId('');
    setImageCropperOpen(false);
    setTmpUploadedImg(null);
    setCroppedImage(null);
  }

  const handleCloseImageCropper = () => {
    setImageCropperOpen(false);
    setTmpUploadedImg(null);
  }

  return (
    <Dialog
      open={open}
    >
      <Typography className={classes.dialogTitle}>
        What are you thinking ?
      </Typography>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          margin='dense'
          id='name'
          label='Post Content'
          fullWidth
          value={content}
          onChange={evt => handleContentInputChange(evt)}
          className={classes.contentField}
        />
        <div className={classes.tagsInputPlace}>
          {
            tags.map((tag: string, index: number) => (
              <Chip
                className={classes.chip}
                key={index}
                label={tag}
                onDelete={handleDeleteTag(tag)}
                color='primary'
                variant='outlined'
              />
            ))
          }
          <input
            ref={input => { tagInput = input}}
            className={classes.tagInputField}
            value={tagInputValue}
            placeholder='Tag'
            onChange={handleTagInputChange}
            onKeyPress={handleTagInputCharacter}
          />
        </div>
        <DropZone
          handleUploadImage={handleUploadImage}
          snackBarHandler={snackBarHandler}
        />
        {
          tmpUploadedImg
          ? <ImageCropper
              open={imageCropperOpen}
              srcImg={{
                url: URL.createObjectURL(tmpUploadedImg),
                plainObject: tmpUploadedImg,
              }}
              handleClose={handleCloseImageCropper}
              setCroppedImage={setCroppedImage}
              snackBarHandler={snackBarHandler}
            />
          : <></>
        }
        <div className={classes.previewImages}>
          {
            uploadedImages.map((image: File, index: number) => (
              <ImagePreviewer
                key={index}
                index={index}
                imageSrc={image}
                handleRemoveImage={handleRemoveImage}
              />
            ))
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          onClick={() => {
            handleResetState();
            closeDialogHandler();
          }}
          color='primary'
        >
          Cancel
        </Button>
        <Button
          className={classes.dialogButton}
          onClick={handleSubmit}
          color='primary'
        >
          {
            isCreatingPost
            ? <CircularProgress color='primary' />
            : 'Share'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}
