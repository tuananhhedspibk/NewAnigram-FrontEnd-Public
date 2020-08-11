import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useLazyQuery,
  useSubscription,
  useMutation,
} from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';

import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { NotificationMenuItem } from
  '../notification/NotificationMenuItem';
import { AlertSnackBar } from './AlertSnackBar';

import {
  authStateSelector,
  notifyStateSelector,
} from '../../redux/selectors';
import {
  signOutRequest,
  signOutSuccess,
  signOutFailed,
} from '../../redux/auth/actions';
import {
  addNotifyRequest,
  fetchNotifiesRequest,
  fetchNotifiesSuccess,
  markReadNotifiesRequest,
  markReadNotifyRequest,
  markReadNotifiesFailed,
  markReadNotifyFailed,
  resetStateRequest,
  emptyStatusRequest,
} from '../../redux/notify/actions';

import fetchNotifications from
  '../../lib/queries/fetchNotifications';
import markNotificationAsRead from
  '../../lib/mutations/markNotificationAsRead';
import batchMarkNotificationAsRead from
  '../../lib/mutations/batchMarkNotificationAsRead';
import notificationAddedSubscription
  from '../../lib/subscriptions/notificationAdded';

import {
  JWT_TOKEN,
  LOG_TYPES,
  NOTIFY_STATE_STATUSES,
  ROUTES,
  USER_INFO,
} from '../utils/constants';
import {
  getLocalStorageUserId,
  handleNotifyItemOnClick,
  handleMarkAllNotifiesAsRead,
  logger,
} from '../utils/helpers';

import { MAIN_THEME } from '../../assets/styles/themes';
import { appBarStyle } from '../../assets/styles/appBar';

interface ApplicationBarProps {
  history: any,
};

export const ApplicationBar = (props: ApplicationBarProps) => {
  const classes = appBarStyle(MAIN_THEME);
  const { history } = props;
  const localStorageUserId = getLocalStorageUserId();

  const [ anchorProfileEl, setAnchorProfileEl ] =
    useState<null | HTMLElement>(null);
  const [ anchorNotifiEl, setAnchorNotifiEl ] =
    useState<null | HTMLElement>(null);
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] =
    useState<null | HTMLElement>(null);
  const [ newComingNotify, setNewComingNotify ] = useState(null as any);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const authState = useSelector(authStateSelector);
  const notifyState = useSelector(notifyStateSelector);
  const dispatch = useDispatch();

  const isProfileMenuOpen = Boolean(anchorProfileEl);
  const isNotifiMenuOpen = Boolean(anchorNotifiEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { addToast } = useToasts();

  const fetchNotificationsTuple = useLazyQuery(fetchNotifications);
    
  const [ batchMarkNotificationAsReadMutation ] =
    useMutation(batchMarkNotificationAsRead);
  const [ markNotificationAsReadMutation ] =
    useMutation(markNotificationAsRead);
  const notifiAddedSubscriptionResult = useSubscription(
    notificationAddedSubscription, {
      variables: {
        currentUserId: localStorageUserId,
      }
    }
  );

  useEffect(() => {
    if (authState.isSignOuting) {
      try {
        localStorage.removeItem(JWT_TOKEN);
        localStorage.removeItem(USER_INFO);
        dispatch(signOutSuccess());
      }
      catch (err) {
        logger(LOG_TYPES.Error, 'ApplicationBar-useEffect', err);
        dispatch(signOutFailed());
      }
    }
  }, [ authState.isSignOuting, dispatch ]);

  useEffect(() => {
    switch (notifyState.status) {
      case NOTIFY_STATE_STATUSES.FetchingNotifies: {
        fetchNotificationsTuple[0]();
        break;
      }
      case NOTIFY_STATE_STATUSES.AddNotifySuccess: {
        if (newComingNotify) {
          dispatch(emptyStatusRequest());
          addToast(
            JSON.stringify(newComingNotify), {
              appearance: 'info',
              autoDismiss: true,
            },
          );
          setNewComingNotify(null);
        }
        break;
      }
      case NOTIFY_STATE_STATUSES.Init: {
        dispatch(fetchNotifiesRequest());
        break;
      }
    } 
  }, [ notifyState.status ]);

  useEffect(() => {
    if (fetchNotificationsTuple[1].data !== undefined) {
      const response = fetchNotificationsTuple[1].data;
      dispatch(fetchNotifiesSuccess(response.notifications));
    }
  }, [ fetchNotificationsTuple[1] ]);

  useEffect(() => {
    if (notifiAddedSubscriptionResult.data
      && notifiAddedSubscriptionResult.data !== undefined) {
      const newNotify = notifiAddedSubscriptionResult.data.notificationAdded;
      setNewComingNotify(newNotify);

      dispatch(addNotifyRequest(newNotify));
    }
  }, [
    notifiAddedSubscriptionResult.data,
  ]);

  const handleProfileMenuOpen =
    (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleNotifiMenuOpen =
    (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotifiEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setAnchorProfileEl(null);
    handleMobileMenuClose();
  };

  const handleNotifiMenuClose = () => {
    setAnchorNotifiEl(null);
    handleMobileMenuClose();
  };

  const handleRedirectTo = (route: string) => {
    history.replace(route);
  }

  const handleMobileMenuOpen =
    (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
  const handleSignOut = () => {
    dispatch(resetStateRequest());
    dispatch(signOutRequest());
  }

  const profileMenuId = 'primary-search-profile-menu';
  const notifiMenuId = 'primary-search-notifi-menu';

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem
        onClick={() => handleRedirectTo(ROUTES.Profile)}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => handleRedirectTo(ROUTES.Settings)}
      >
        Settings
      </MenuItem>
      <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      anchorEl={anchorNotifiEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notifiMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotifiMenuOpen}
      onClose={handleNotifiMenuClose}
    >
      <div className={classes.menuHeader}>
        <button
          className={classes.buttonAsLink}
          onClick={() => handleMarkAllNotifiesAsRead(
            notifyState.unreadNotifyIds,
            batchMarkNotificationAsReadMutation,
            markReadNotifiesRequest,
            markReadNotifiesFailed,
            dispatch,
            setSnackBarOpen,
            setSnackBarType,
            setSnackBarMessage,
          )}
        >
          Mark all as read
        </button>
        <a
          href={ROUTES.Notifications}
          className={classes.link}
        >
          See all
        </a>
      </div>
      <div className={classes.notificationsWrapper}>
        {
          notifyState.notifies.length > 0
          ? notifyState.notifies.map((notify: any) => (
            <MenuItem
              className={classes.menuItem}
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
            </MenuItem>
          ))
          : <MenuItem className={classes.placeholderItem}>
              <p className={classes.placeholderText}>
                Hooray, you have no notifications now
              </p>
              <CheckCircleIcon className={classes.customIcon} />
            </MenuItem>
        }
      </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotifiMenuOpen}>
        <IconButton
          aria-label={`show ${notifyState.badgeData} new notifications`}
          color='inherit'
        >
          <Badge badgeContent={notifyState.badgeData} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-profile-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return(
    <div className={classes.grow}>
       <AlertSnackBar
        message={snackBarMessage}
        type={snackBarType}
        open={snackBarOpen}
        handleClose={() => setSnackBarOpen(false)}
      />
      <AppBar position='static' className={classes.appBarRoot}>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
          <Link
            className={classes.homeLink}
            href={ROUTES.Home}
            onClick={() => handleRedirectTo(ROUTES.Home)}
          >
            NewAnigram
          </Link>
          </Typography>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder='Search...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          </div>
          <div className={classes.grow} />
          {
            authState.isAuthenticated
            ? <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label={`show ${notifyState.badgeData} new notifications`}
                  color='inherit'
                  onClick={handleNotifiMenuOpen}
                >
                  <Badge badgeContent={notifyState.badgeData} color='error'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={profileMenuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </div>
            : <></>
          }
          {
            authState.isAuthenticated
            ? <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </div>
            : <></>
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
      {renderNotificationsMenu}
    </div>
  )
}
