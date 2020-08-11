import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { imagePreviewerStyle } from
  '../../assets/styles/imagePreviewer';
import { MAIN_THEME } from '../../assets/styles/themes';

interface ImagePreviewerProps {
  index: number;
  imageSrc: File;
  handleRemoveImage: any;
}

export const ImagePreviewer = (props: ImagePreviewerProps) => {
  const classes = imagePreviewerStyle(MAIN_THEME);
  const {
    index,
    imageSrc,
    handleRemoveImage
  } = props;

  return (
    <div className={classes.root}>
      <img
        className={classes.previewer}
        alt='preview'
        src={URL.createObjectURL(imageSrc)}
      />
      <CloseIcon
        onClick={() => handleRemoveImage(index)}
        className={classes.closeIcon}
      />
    </div>
  )
}
