import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { MuiThemeProvider } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SendIcon from '@material-ui/icons/Send';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { AlertSnackBar } from '../shared/AlertSnackBar';
import { ApplicationBar } from '../shared/ApplicationBar';

import sendActiveAccountEmail from '../../lib/mutations/sendActiveAccountEmail';

import { authStateSelector } from '../../redux/selectors';

import {
  PopupStatus,
  ROUTES,
  SNACKBAR_TYPES,
  USER_SIGNUP_EMAIL,
} from '../utils/constants';
import { handleSnackBar } from '../utils/helpers';

import { MAIN_THEME } from '../../assets/styles/themes';
import { sendActiveMailStyle } from '../../assets/styles/sendActiveMail';

interface SendActiveMailProps {
  history: any;
}

export const SendActiveMail = (props: SendActiveMailProps) => {
  const classes = sendActiveMailStyle(MAIN_THEME);
  const { history } = props;

  const [ signupEmail ] = useState(
    localStorage.getItem(USER_SIGNUP_EMAIL) === null
    ? ''
    : localStorage.getItem(USER_SIGNUP_EMAIL)
  );

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const authState = useSelector(authStateSelector);
  const [ sendActiveAccountEmailMutation ] =
    useMutation(sendActiveAccountEmail);

  useEffect(() => {
    if (authState.isAuthenticated || signupEmail === '') {
      history.replace(ROUTES.Home);
    }
  }, [ authState.isAuthenticated, history, signupEmail ]);

  const handleResendEmail = async () => {
    const res = await sendActiveAccountEmailMutation({
      variables: {
        email: signupEmail,
      }
    });
    
    if (res.data.sendActiveAccountEmail.result) {
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Success,
        res.data.sendActiveAccountEmail.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    } else {
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        res.data.sendActiveAccountEmail.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    }
  }

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={MAIN_THEME}>
        <ApplicationBar history={history} />
        <AlertSnackBar
          message={snackBarMessage}
          type={snackBarType}
          open={snackBarOpen}
          handleClose={() => setSnackBarOpen(false)}
        />
        <div className={classes.content}>
          <p className={`${classes.text} ${classes.title}`}>
            {`We have sent you an active account email,\
            check your email (${signupEmail}) for more details.`}
          </p>
          <section className={classes.attention}>
            <ErrorOutlineIcon className={classes.icon} />
            <p className={classes.text}>
              If you didn't receive any email,
            </p>
            <button
              className={classes.button}
              onClick={handleResendEmail}
            >
              click here
            </button>
            <p className={classes.text}>
              to re-send a new one.
            </p>
          </section>
          <section className={classes.symbolIcons}>
            <SendIcon
              className={`${classes.icon} ${classes.sendIcon}`}
            />
            <MailOutlineIcon
              className={`${classes.icon} ${classes.mailIcon}`}
            />
          </section>
        </div>
      </MuiThemeProvider>
    </div>
  )
}
