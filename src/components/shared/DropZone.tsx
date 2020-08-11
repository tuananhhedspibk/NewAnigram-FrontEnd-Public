import React from 'react';
import { useDropzone } from 'react-dropzone';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';

import { MAIN_THEME } from '../../assets/styles/themes';
import { dropZoneStyle } from '../../assets/styles/dropZone';
import {
  ERROR_MESSAGES,
  PopupStatus,
  SNACKBAR_TYPES,
} from '../utils/constants';

interface DropZoneInterface {
  handleUploadImage: any;
  snackBarHandler: any;
}

export const DropZone = (props: DropZoneInterface) => {
  const { 
    handleUploadImage,
    snackBarHandler,
  } = props;

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/*',
    noKeyboard: true,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 1) {
        snackBarHandler(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          ERROR_MESSAGES.Post.MultipleImages,
        );
        return;
      }
      handleUploadImage(acceptedFiles[0]);
    }
  });
  const classes = dropZoneStyle(MAIN_THEME);

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className={classes.dropPlace}>
          <BackupOutlinedIcon className={classes.uploadIcon} />
          <p className={classes.dropPlaceTitle}>
            Drag and Drop to upload image
          </p>
        </div>
      </div>
    </section>
  );
}
