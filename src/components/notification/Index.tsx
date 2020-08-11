import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import debounce from 'lodash.debounce';

import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { NotificationMenuItem } from './NotificationMenuItem';
import { ApplicationBar } from '../shared/ApplicationBar';
import { AlertSnackBar } from '../shared/AlertSnackBar';

import {
  authStateSelector,
  notifyStateSelector,
} from '../../redux/selectors';
import {
  markReadNotifiesRequest,
  markReadNotifiesFailed,
  markReadNotifyRequest,
  markReadNotifyFailed,
} from '../../redux/notify/actions';

import markNotificationAsRead from
  '../../lib/mutations/markNotificationAsRead';
import batchMarkNotificationAsRead from
  '../../lib/mutations/batchMarkNotificationAsRead';

import {
  BATCH_ITEMS_SIZE,
  LOADING_MORE_DELAY,
  ROUTES,
} from '../utils/constants';
import {
  delay,
  handleNotifyItemOnClick,
  handleMarkAllNotifiesAsRead,
} from '../utils/helpers';

import { notitifcationsIndexStyle } from
  '../../assets/styles/notificationsIndex';
import { MAIN_THEME } from '../../assets/styles/themes';

interface NotificationsIndexProps {
  history: any;
}

export const NotificationsIndex = (props: NotificationsIndexProps) => {
  const classes = notitifcationsIndexStyle(MAIN_THEME);
  const { history } = props;

  const [
    lastShowingItemIndex,
    setLastShowingItemIndex
  ] = useState(BATCH_ITEMS_SIZE - 1);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ unreadNotifiIds, setUnreadNotifiIds ] = useState([] as any);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const [ markNotificationAsReadMutation ] =
    useMutation(markNotificationAsRead);
  const [ batchMarkNotificationAsReadMutation ] =
    useMutation(batchMarkNotificationAsRead);

  const dispatch = useDispatch();

  const authState = useSelector(authStateSelector);
  const notifyState = useSelector(notifyStateSelector);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push(ROUTES.SignIn);
    }
  }, [ authState.isAuthenticated, history ]);

  useEffect(() => {
    if (notifyState.notifies.length > 0) {
      const unreadNotiIds = [] as any;
      
      notifyState.notifies.forEach(
        (notifi: any) => {
          if(!notifi.read) {
            unreadNotiIds.push(notifi.id);
          }
        }
      )
      setUnreadNotifiIds(unreadNotiIds);
    }
  }, [ notifyState.notifies ]);

  window.onscroll = debounce(async () => {
    // documentElement returns the Element that is the root element of the document
    // (for example, the <html> element for HTML documents).

    // scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically
    
    // innerHeight property of the Window interface returns the interior height of the window in pixels,
    // including the height of the horizontal scroll bar, if present

    // offsetHeight read-only property returns the height of an element,
    // including vertical padding and borders, as an integer

    const baseValue = 
      Math.round(window.innerHeight + document.documentElement.scrollTop);
    const pivotsSet = [baseValue - 1, baseValue, baseValue + 1]

    if (pivotsSet.indexOf(document.documentElement.offsetHeight) > -1) {
      if (notifyState.notifies.length - lastShowingItemIndex > 1) {
        setIsLoadingMore(true);
        await delay(LOADING_MORE_DELAY);
        loadMoreNotifications();
      }
    }
  }, 100);

  const loadMoreNotifications = () => {
    if (lastShowingItemIndex + BATCH_ITEMS_SIZE < notifyState.notifies.length) {
      setLastShowingItemIndex(lastShowingItemIndex + BATCH_ITEMS_SIZE);
    } else {
      setLastShowingItemIndex(notifyState.notifies.length - 1);
    }
    setIsLoadingMore(false);
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <ApplicationBar history={history} />
      <AlertSnackBar
        message={snackBarMessage}
        type={snackBarType}
        open={snackBarOpen}
        handleClose={() => setSnackBarOpen(false)}
      />
      <div className={classes.root}>
        <div className={classes.content}>
          {
            notifyState.notifies.length > 0
            ? <button
                onClick={() => handleMarkAllNotifiesAsRead(
                  unreadNotifiIds,
                  batchMarkNotificationAsReadMutation,
                  markReadNotifiesRequest,
                  markReadNotifiesFailed,
                  dispatch,
                  setSnackBarOpen,
                  setSnackBarType,
                  setSnackBarMessage,
                )}
                className={classes.buttonAsLink}
              >
                Mark all as read
              </button>
            : <div className={classes.placeholder}>
                <p className={classes.placeholderText}>
                  Hooray, you have no notifications now
                </p>
                <ThumbUpIcon className={classes.thumbsupIcon}/>
              </div>
          }
          {
            notifyState.notifies.map((notify: any, index: number) => (
              <Card
                className={
                  index > lastShowingItemIndex
                  ? classes.hideCard
                  : (
                    notify.read
                    ? classes.notifiCard
                    : `${classes.notifiCard} ${classes.unreadNotifi}`
                  )
                }
                onClick={() => handleNotifyItemOnClick(
                  notify,
                  markNotificationAsReadMutation,
                  markReadNotifyRequest,
                  markReadNotifyFailed,
                  dispatch,
                  setSnackBarOpen,
                  setSnackBarType,
                  setSnackBarMessage,
                  history,
                )}
              >
                <NotificationMenuItem data={notify} />
              </Card>
            ))
          }
          <div className={classes.circularProgressWrapper}>
            {
              isLoadingMore
              ? <CircularProgress
                  className={classes.circularProgress}
                  color='secondary'
                />
              : <></>
            }
            {
              lastShowingItemIndex === notifyState.notifies.length - 1
              ? <div className={classes.buttonWrapper}>
                  <button
                    onClick={() => handleMarkAllNotifiesAsRead(
                      unreadNotifiIds,
                      batchMarkNotificationAsReadMutation,
                      markReadNotifiesRequest,
                      markReadNotifiesFailed,
                      dispatch,
                      setSnackBarOpen,
                      setSnackBarType,
                      setSnackBarMessage,
                    )}
                    className={classes.buttonAsLink}
                  >
                    Mark all as read
                  </button>
                </div>
              : <></>
            }
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}
