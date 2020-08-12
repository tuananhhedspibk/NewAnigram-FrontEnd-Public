import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import confirmPassword from '../../lib/queries/confirmPassword';

import { passwordConfirmFormStyle } from '../../assets/styles/passwordConfirmForm';
import { MAIN_THEME } from '../../assets/styles/themes';

import {
  PopupStatus,
  SNACKBAR_TYPES,
} from '../utils/constants';

interface PasswordInputFormProps {
  open: boolean;
  setConfirmPassMatch: Function;
  snackBarHandler: Function;
  closeFormHandler: any;
}

export const PasswordConfirmForm = (props: PasswordInputFormProps) => {
  const {
    closeFormHandler,
    open,
    setConfirmPassMatch,
    snackBarHandler,
  } = props;
  const classes = passwordConfirmFormStyle(MAIN_THEME);

  const [ password, setPassword ] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const [ confirmPasswordQuery, { data } ] =
    useLazyQuery(confirmPassword, {
      fetchPolicy: 'no-cache'
    });

  useEffect(() => {
    if (data) {
      setIsSubmitting(false);
      setPassword('');
      if (!data.confirmPassword.result) {
        snackBarHandler(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          data.confirmPassword.message,
        );
      } else {
        setConfirmPassMatch(true);
        closeFormHandler();
      }
    }
  }, [ data ]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    confirmPasswordQuery({
      variables: {
        candidatePassword: password,
      },
    });
  }

  const handleInputChange = (evt: any) => {
    setPassword(evt.target.value);
  }

  return (
    <Dialog
      className={classes.root}
      open={open}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle className={classes.formTitle} id='form-dialog-title'>
        Show me your password
      </DialogTitle>
      <DialogContent>
        <p className={classes.label}>
          Password
        </p>
        <TextField
          autoFocus
          onChange={handleInputChange}
          variant='outlined'
          type='password'
          value={password}
          fullWidth
        />
      </DialogContent>
      <DialogActions className={classes.formActions}>
        <Button
          className={classes.button}
          onClick={closeFormHandler}
          color='primary'
        >
          Cancel
        </Button>
        {
          isSubmitting
          ? <CircularProgress color='primary' />
          : <Button
              className={classes.button}
              onClick={handleSubmit}
              color='primary'
            >
              Confirm
            </Button>
        }
      </DialogActions>
    </Dialog>
  )
}
