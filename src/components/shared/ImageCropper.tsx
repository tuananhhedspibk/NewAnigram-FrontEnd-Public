import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import Done from '@material-ui/icons/Done';

import {
  ERROR_MESSAGES,
  SNACKBAR_TYPES,
  PopupStatus,
  UploadedImage,
} from '../utils/constants';

import { imageCropperStyle } from '../../assets/styles/imageCropper';
import { MAIN_THEME } from '../../assets/styles/themes';

import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  open: boolean;
  srcImg: UploadedImage;
  handleClose: Function;
  setCroppedImage: Function;
  snackBarHandler: Function;
}

export const ImageCropper = (props: ImageCropperProps) => {
  const classes = imageCropperStyle(MAIN_THEME);
  const { srcImg, open, handleClose, setCroppedImage, snackBarHandler } = props;

  const [ crop, setCrop ] = useState({ unit: '%', width: 30, aspect: 9 / 9 });
  const [ previewUrl, setPreviewUrl ] = useState('');
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ imgRef, setImgRef ] = useState(null as any);
  const [ blobImg, setBlobImg ] = useState(null as any);

  const onLoad = useCallback(img => {
    setImgRef(img);
  }, []);

  const makeClientCrop = async (crop: any) => {
    if (imgRef && crop.width && crop.height) {
      setIsProcessing(true);
      createCropPreview(imgRef, crop, imgRef.name);
    }
  };

  const createCropPreview = async (image: any, crop: any, fileName: string) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d') as any;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((_resolve, reject) => {
      canvas.toBlob((blob: any) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        URL.revokeObjectURL(previewUrl);

        setPreviewUrl(URL.createObjectURL(blob));
        setBlobImg(blob);
        setIsProcessing(false);
      }, `image/${srcImg.plainObject.type.split('/')[1]}`);
    });
  };

  const renderMiddleIcon = () => {
    if (blobImg) {
      if (isProcessing) {
        return (
          <CircularProgress
            className={classes.icon}
          />
        );
      } else {
        return (
          <Done
            className={classes.icon}
          />
        );
      }
    } else {
      return <></>;
    }
  }

  return (
    <Dialog open={open}>
      <Typography className={classes.title}>
        Crop your favourite part
      </Typography>
      <DialogContent className={classes.content}>
        <ReactCrop
          className={classes.cropper}
          src={srcImg.url}
          crop={crop as any}
          onImageLoaded={onLoad}
          onChange={(c: any) => setCrop(c)}
          onComplete={makeClientCrop}
        />
        <div className={classes.middleIcon}>
          {renderMiddleIcon()}
        </div>
        {
          previewUrl &&
          <div className={classes.previewImgWrapper}>
            <img alt='Crop preview' src={previewUrl} />
          </div>
        }
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          className={`${classes.button} ${classes.cancelButton}`}
          onClick={() => handleClose()}
          color='primary'
        >
          Cancel
        </Button>
        <Button
          className={`${classes.button} ${classes.cancelButton}`}
          onClick={() => {
            setCroppedImage(srcImg.plainObject);
          }}
          variant='outlined'
          color='primary'
        >
          Keep it
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            if (blobImg) {
              setCroppedImage(blobImg);
            } else {
              snackBarHandler(
                PopupStatus.Open,
                SNACKBAR_TYPES.Error,
                ERROR_MESSAGES.Post.CropImage.HaveNotCropped,
              );
            }
          }}
          variant='contained'
          color='primary'
        >
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  )
}
