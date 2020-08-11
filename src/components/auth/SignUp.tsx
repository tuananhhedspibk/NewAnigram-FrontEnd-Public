import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

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

import {
  signUpRequest,
  signUpSuccess,
  signUpFailed,
} from '../../redux/auth/actions';
import { authStateSelector } from '../../redux/selectors';

import signUp from '../../lib/mutations/signUp';

import {
  isEmailValidate,
  isPasswordSafe,
  logger,
  handleSnackBar,
  handleLinkClick,
} from '../utils/helpers';
import {
  ERROR_MESSAGES,
  LOG_TYPES,
  PopupStatus,
  ROUTES,
  SNACKBAR_TYPES,
  USER_SIGNUP_EMAIL,
} from '../utils/constants';

import { MAIN_THEME } from '../../assets/styles/themes';
import { authStyle } from '../../assets/styles/auth';

import '../../assets/styles/custom.scss';

interface SignUpProps {
  history: any;
};

export const SignUp = (props: SignUpProps): JSX.Element => {
  const classes = authStyle(MAIN_THEME);
  const { history } = props;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPass, setConfirmPass ] = useState('');
  const [ emailValidate, setEmailValidate ] = useState(true);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const [ signUpMutation ] = useMutation(signUp);
  const authState = useSelector(authStateSelector);
  const dispatch = useDispatch();

  const handleEmailInputChange = (currentEmail: string) => {
    setEmail(currentEmail);
    if (currentEmail !== '') {
      setEmailValidate(isEmailValidate(currentEmail));
    } else {
      setEmailValidate(true);
    }
  }
  
  useEffect(() => {
    const signUpHandler = async () => {
      try {
        const res = await signUpMutation({
          variables: {
            email,
            password,
          }
        });
        if (res.data.signUp.result) {
          dispatch(signUpSuccess());
          localStorage.setItem(USER_SIGNUP_EMAIL, email);
          history.replace(ROUTES.SendActiveMail);
        } else {
          const message = res.data.signUp.message;

          dispatch(signUpFailed());
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
          'SignUpComponent-useEffect-signUpHandler',
          err,
        );
        dispatch(signUpFailed());
      }
    }

    if (authState.isAuthenticated) {
      history.replace(ROUTES.Home);
    }
    if (authState.isAuthenticating) {
      signUpHandler();
    }
  }, [
    authState.isAuthenticated,
    authState.isAuthenticating,
  ]);

  const handleSubmit = () => {
    if (email !== '' && password !== ''
      && confirmPass === password
      && emailValidate) {
        dispatch(signUpRequest());
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

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  }

  return (
    <div className={classes.body}>
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
              helperText={`Length must greater than 8 and \
                must have both upper and lower cases,\
                at least on of these characters: [@, $, !, %, *, ?, &]`
              }
              error={password.length > 0 && !isPasswordSafe(password)}
              id={
                password.length === 0 || isPasswordSafe(password)
                ? 'standard-dense'
                : 'standard-error'
              }
              label={
                password.length === 0
                ? 'Password'
                : isPasswordSafe(password)
                  ? 'Password safe ✓'
                  : 'Password unsafe ✗'
              }
              margin='dense'
              value={password}
              className={classes.input}
              type={showPassword ? 'text' : 'password'}
              onChange={evt => setPassword(evt.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      { showPassword ? <VisibilityOff /> : <Visibility /> }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={
                password !== confirmPass
                && password.length > 0
                && confirmPass.length > 0
              }
              id={
                password === confirmPass
                || password.length === 0
                || confirmPass.length === 0
                  ? 'standard-dense'
                  : 'standard-error'
              }
              type={showConfirmPassword ? 'text' : 'password'}
              label={
                password === confirmPass
                || password.length === 0
                || confirmPass.length === 0
                  ? 'Confirm Password'
                  : 'Confirm Password isn\'t same with Password'
              }
              margin='dense'
              value={confirmPass}
              className={classes.input}
              onChange={evt => setConfirmPass(evt.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={
                        () => setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {
                        showConfirmPassword
                          ? <VisibilityOff />
                          : <Visibility />
                      }
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
                () => handleLinkClick(history, ROUTES.SignIn)
              }
            >
              Have an account?
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
                : 'Sign Up'
              }
            </Button>
          </div>
        </Card>
      <AlertSnackBar
        message={snackBarMessage}
        type={snackBarType}
        open={snackBarOpen}
        handleClose={handleCloseSnackBar}
      />
      </MuiThemeProvider>
    </div>
  );
}
