import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { SNACKBAR_AUTO_HIDE_DURATION } from '../utils/constants';

import { alertSnackBarStyles } from '../../assets/styles/alertSnackBar';

interface AlertSnackBarProps {
  message: string;
  type: any;
  open: boolean;
  handleClose: any;
}

export const AlertSnackBar = (props: AlertSnackBarProps) => {
  const {
    message,
    type,
    open,
    handleClose,
  } = props;
  const classes = alertSnackBarStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top', horizontal: 'right'
        }}
        open={open}
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={() => handleClose()}
      >
        <Alert onClose={() => handleClose()} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
