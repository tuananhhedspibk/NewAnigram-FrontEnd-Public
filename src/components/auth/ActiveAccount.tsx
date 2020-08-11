import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { MuiThemeProvider } from '@material-ui/core/styles';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';

import { ApplicationBar } from '../shared/ApplicationBar';
import { AlertSnackBar } from '../shared/AlertSnackBar';

import { authStateSelector } from '../../redux/selectors';

import activeAccount from '../../lib/mutations/activeAccount';

import {
  handleSnackBar,
  logger,
} from '../utils/helpers';
import {
  ERROR_MESSAGES,
  LOG_TYPES,
  PopupStatus,
  ROUTES,
  SNACKBAR_TYPES,
  JWT_TOKEN,
  USER_INFO,
  USER_SIGNUP_EMAIL,
  WEB_HOST,
} from '../utils/constants';

import { MAIN_THEME } from '../../assets/styles/themes';
import { activeAccountStyle } from '../../assets/styles/activeAccount';
import { signInSuccess } from '../../redux/auth/actions';

interface ActiveAccountProps {
  history: any;
}

export const ActiveAccount = (props: ActiveAccountProps) => {
  const classes = activeAccountStyle(MAIN_THEME);
  const { history } = props;

  const [ signupEmail ] = useState(
    localStorage.getItem(USER_SIGNUP_EMAIL) === null
    ? ''
    : localStorage.getItem(USER_SIGNUP_EMAIL)
  );

  const [ isLoading, setIsLoading ] = useState(true);
  const [ activeSuccess, setActiveSuccess ] = useState(false);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const authState = useSelector(authStateSelector);
  const dispatch = useDispatch();

  const [ activeAccountMutation ] = useMutation(activeAccount);

  useEffect(() => {
    const historySearch = history.location.search;
    const activeAccountHandler = async (uid: string, key: string) => {
      try {
        const res = await activeAccountMutation({
          variables: {
            uid,
            key,
          }
        });

        if (res.data.activeAccount.result) {
          setIsLoading(false);
          const jwtToken = res.data.activeAccount.token;
          const user = res.data.activeAccount.user;

          localStorage.setItem(JWT_TOKEN, JSON.stringify(jwtToken));
          localStorage.setItem(USER_INFO, JSON.stringify(user));
          localStorage.removeItem(USER_SIGNUP_EMAIL);

          setActiveSuccess(true);
          dispatch(signInSuccess());
        } else {
          setIsLoading(false);
          handleSnackBar(
            PopupStatus.Open,
            SNACKBAR_TYPES.Error,
            res.data.activeAccount.message,
            setSnackBarOpen,
            setSnackBarType,
            setSnackBarMessage,
          );
        }
      }
      catch (err) {
        logger(LOG_TYPES.Error, 'ActiveAccount-useEffect', err);
      } 
    }

    if (
      historySearch === undefined
      || historySearch.length === 0
    ) {
      setIsLoading(false);
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        ERROR_MESSAGES.Common.WrongParams,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
    } else {
      const queryStringParams = historySearch.split('?')[1];
      const splitedParams = queryStringParams.split('&');

      if (splitedParams.length !== 2
        || splitedParams[0].split('=')[0] !== 'uid'
        || splitedParams[1].split('=')[0] !== 'key'
      ) {
        setIsLoading(false);
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          ERROR_MESSAGES.Common.WrongParams,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
      } else {
        if (signupEmail !== '') {
          const uid = splitedParams[0].split('=')[1];
          const hashKey = splitedParams[1].split('=')[1];

          activeAccountHandler(uid, hashKey);
        } else {
          history.replace(ROUTES.Home);
        }
      }
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={classes.content}>
          <p>
            Take a coffee while waiting us active your acount 
          </p>
          <section className={classes.icon}>
            <CircularProgress
              className={classes.circularProgress}
            />
          </section>
        </div>
      );
    } else {
      if (activeSuccess) {
        return (
          <div className={classes.content}>
            <p>
              Congratulation !! Active account successfully, start exploring
              <a className={classes.link} href={WEB_HOST}>
                newanigram
              </a>
              now !!
            </p>
            <section>
              <CheckCircleOutlineIcon
                className={`${classes.icon} ${classes.successIcon}`}
              />
            </section>
          </div>
        );
      } else {
        if (authState.isAuthenticated) {
          return (
            <div className={classes.content}>
              <p>
                Your account has been activated
              </p>
              <section>
                <ThumbUpIcon
                  className={`${classes.icon} ${classes.successIcon}`}
                />
              </section>
            </div>
          );
        } else {
          return (
            <div className={classes.content}>
              <p>
                Ooppss x_x !!! Something has gone wrong, active account failed
              </p>
              <section>
                <HighlightOffIcon
                  className={`${classes.icon} ${classes.failedIcon}`}
                />
              </section>
            </div>
          );
        }
      }
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
        {renderContent()}
      </MuiThemeProvider>
    </div>
  );
}
