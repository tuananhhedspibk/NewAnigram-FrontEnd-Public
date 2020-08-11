import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { AlertSnackBar } from '../shared/AlertSnackBar';

import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  signInRequest,
  signInSuccess,
  signInFailed,
} from '../../redux/auth/actions';
import { authStateSelector } from '../../redux/selectors';

import signIn from '../../lib/mutations/signIn';

import { isEmailValidate, handleLinkClick } from '../utils/helpers';

import { MAIN_THEME } from '../../assets/styles/themes';
import { authStyle } from '../../assets/styles/auth';

import '../../assets/styles/custom.scss';
import {
  ROUTES,
  JWT_TOKEN,
  USER_INFO,
  LOG_TYPES,
  SNACKBAR_TYPES,
  PopupStatus,
  ERROR_MESSAGES,
} from '../utils/constants';
import {
  logger,
  handleSnackBar,
} from '../utils/helpers';

interface SignInProps {
  history: any;
};

export const SignIn = (props: SignInProps): JSX.Element  => {
  const classes = authStyle(MAIN_THEME);
  const { history } = props;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ emailValidate, setEmailValidate ] = useState(true);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const [ signInMutation ] = useMutation(signIn);
  const authState = useSelector(authStateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const signInHandler = async () => {
      try {
        const res = await signInMutation({
          variables: {
            email,
            password,
          }
        });
        if (res.data.signIn.result) {
          const user = res.data.signIn.user;
          const jwtToken = res.data.signIn.token;

          localStorage.setItem(JWT_TOKEN, JSON.stringify(jwtToken));
          localStorage.setItem(USER_INFO, JSON.stringify(user));

          dispatch(signInSuccess());
        } else {
          const message = res.data.signIn.message;
          dispatch(signInFailed());

          handleSnackBar(
            PopupStatus.Open,
            SNACKBAR_TYPES.Error,
            message,
            setSnackBarOpen,
            setSnackBarType,
            setSnackBarMessage,
          );
        }
      } catch (err) {
        logger(
          LOG_TYPES.Error,
          'SignInComponent-useEffect-signInHandler',
          err
        );
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          ERROR_MESSAGES.SystemError,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
        dispatch(signInFailed());
      }
    }
    if (authState.isAuthenticated) {
      history.push(ROUTES.Home);
    }
    if (authState.isAuthenticating) {
      signInHandler();
    }
  }, [
    authState.isAuthenticating,
    authState.isAuthenticated,
  ]);

  const handleSubmit = () => {
    if (email !== '' && password !== '' && emailValidate) {
      dispatch(signInRequest());
    } else {
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        ERROR_MESSAGES.Authen.EmailPasswordWrong,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    }
  }

  const handleEmailInputChange = (currentEmail: string) => {
    setEmail(currentEmail);
    if (currentEmail !== '') {
      setEmailValidate(isEmailValidate(currentEmail));
    } else {
      setEmailValidate(true);
    }
  }

  return (
    <div className={classes.body}>
      <AlertSnackBar
        message={snackBarMessage}
        type={snackBarType}
        open={snackBarOpen}
        handleClose={() => setSnackBarOpen(false)}
      />
      <MuiThemeProvider theme={MAIN_THEME}>
        <p className={classes.title}>
          NewAnigram
        </p>
        <p className={classes.author}>
          By
          <a
            className={classes.authorName}
            href='https://github.com/tuananhhedspibk'>
              tuananhhedspibk
          </a>
        </p>
        <Card className={classes.card}>
          <div className={classes.topBox}>
            <TextField
              error={!emailValidate}
              id={emailValidate ? 'standard-dense' : 'standard-error'}
              label={emailValidate ? 'Email' : 'Email is not valid'}
              margin='dense'
              value={email}
              className={classes.input}
              onChange={evt => handleEmailInputChange(evt.target.value)}
            />
            <TextField
              id='standard-dense'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              margin='dense'
              value={password}
              className={classes.input}
              onChange={evt => setPassword(evt.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.bottomBox}>
            <Link
              className={classes.link}
              onClick={
                () => handleLinkClick(history, ROUTES.SignUp)
              }
            >
              Create new account
            </Link>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
            >
              {
                authState.isAuthenticating || authState.isAuthenticated
                ? <CircularProgress
                    className={classes.circularProgress}
                  />
                : 'Sign In'
              }
            </Button>
          </div>
        </Card>
      </MuiThemeProvider>
    </div>
  );
}
