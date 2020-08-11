import {
  DAY_IN_MILISECONDS,
  HOUR_IN_MILISECONDS,
  LOG_TYPES,
  MAIL_REGEX,
  MINUTE_IN_MILISECONDS,
  NOTIFICATION_TYPES,
  PASSWORD_CHECKING_REGEX,
  PopupStatus,
  ROUTES,
  SNACKBAR_TYPES,
  USER_INFO,
} from './constants';

export const isEmailValidate = (email: string): boolean => {
  return MAIL_REGEX.test(email);
}

export const isPasswordSafe = (password: string): boolean => {
  return password.length >= 8 && PASSWORD_CHECKING_REGEX.test(password);
}

export const logger = (type: number, objectName: string, message: string) => {
  switch (type) {
    case LOG_TYPES.Info: {
      console.log(`INFO: ${objectName}, Message: `, message);
      break;
    }
    case LOG_TYPES.Error: {
      console.error(`ERROR: ${objectName}, Message: `, message);
      break;
    }
  }
}

export const getItemIndexById = (items: any, id: string): number => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return i;
    }
  }

  return -1;
}

export const getLocalStorageUserId = (): string => {
  if (localStorage.getItem(USER_INFO)) {
    return JSON.parse(localStorage.getItem(USER_INFO) as string).id;
  }
  return '';
}

export const milisecondsToDateTime = (miliseconds: string) => {
  return new Date(+miliseconds);
}

export const formatTimeFromMiliseconds = (input: string) => {
  const inputTime = +input;
  const currentTime = new Date().getTime();

  const delta = currentTime - inputTime;

  const deltaInDays =
    parseInt((delta / DAY_IN_MILISECONDS).toString());
  const deltaInHours =
    parseInt((delta / HOUR_IN_MILISECONDS).toString());
  const deltaInMinutes =
    parseInt((delta / MINUTE_IN_MILISECONDS).toString());

  if (deltaInDays >= 1 && deltaInDays <= 7) {
    if (deltaInDays >= 1) {
      return 'A day ago';
    } else if (deltaInDays === 7) {
      return 'A week ago';
    }
    return `${deltaInDays} days ago`;
  } else if (deltaInDays < 1){
    if (deltaInHours >= 1) {
      if (deltaInHours === 1) {
        return `${deltaInHours} hour ago`;
      }
      return `${deltaInHours} hours ago`;
    } else {
      if (deltaInMinutes >= 1) {
        if (deltaInMinutes === 1) {
          return `${deltaInMinutes} minute ago`; 
        }
        return `${deltaInMinutes} minutes ago`;
      } else {
        return 'A few seconds ago';
      }
    }
  }

  const inputDateTime = milisecondsToDateTime(input);
  const year = inputDateTime.getFullYear();
  const month = inputDateTime.getMonth() + 1;
  const day = inputDateTime.getDate();

  const hour =  inputDateTime.getHours() > 10
    ? inputDateTime.getHours()
    : `0${inputDateTime.getHours()}`;
  const minutes =
    inputDateTime.getMinutes() > 10
    ? inputDateTime.getMinutes()
    : `0${inputDateTime.getMinutes()}`;
  
  return `${year}/${month}/${day} ${hour}:${minutes}`;
}

export const handleSnackBar = (
  status: number,
  type: string,
  message: string,
  setSnackBarOpen: any,
  setSnackBarType: any,
  setSnackBarMessage: any,
) => {
  switch (status) {
    case PopupStatus.Open: {
      setSnackBarOpen(true);
      setSnackBarType(type);
      setSnackBarMessage(message);

      break;
    }
    case PopupStatus.Close: {
      setSnackBarOpen(false);
      setSnackBarType('');
      setSnackBarMessage('');

      break;
    }
  }
}

export const handleNotificationRedirect = (
  notificationType: number,
  postId: string,
  followerId: string,
  history: any,
) => {
  switch (notificationType) {
    case NOTIFICATION_TYPES.Follow: {
      history.push(`${ROUTES.Users}/${followerId}`);
      break;
    }
    case NOTIFICATION_TYPES.CommentPost: {
      history.push(`${ROUTES.Posts}/${postId}`);
      break;
    }
    case NOTIFICATION_TYPES.LikePost: {
      history.push(`${ROUTES.Posts}/${postId}`);
      break;
    }
  }
}

export const handleNotifyItemOnClick = async (
  notify: any,
  markNotificationAsReadMutation: any,
  markReadNotifyRequest: any,
  markReadNotifyFailed: any,
  dispatch: any,
  setSnackBarOpen = null as any,
  setSnackBarType = null as any,
  setSnackBarMessage = null as any,
  history = null as any,
) => {
  if (!notify.read) {
    const res = await markNotificationAsReadMutation({
      variables: {
        id: notify.id
      }
    });
    if (res.data.markNotificationAsRead.result) {
      dispatch(markReadNotifyRequest(notify.id));
    } else {
      dispatch(markReadNotifyFailed());
      if (setSnackBarOpen) {
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          res.data.markNotificationAsRead.message,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
      }
    }
  }

  if (history) {
    handleNotificationRedirect(
      notify.type,
      notify.post,
      notify.follower,
      history,
    );
  }
}

export const handleMarkAllNotifiesAsRead = async (
  unreadNotifyIds: [string],
  batchMarkNotificationAsReadMutation: any,
  markReadNotifiesRequest: any,
  markReadNotifiesFailed: any,
  dispatch: any,
  setSnackBarOpen: any,
  setSnackBarType: any,
  setSnackBarMessage: any,
) => {
  if (unreadNotifyIds.length > 0) {
    const res = await batchMarkNotificationAsReadMutation({
      variables: {
        ids: unreadNotifyIds,
      }
    }) as any;
    if (res.data.markNotificationAsReadByBatch.result) {
      dispatch(markReadNotifiesRequest());
    } else {
      handleSnackBar(
        PopupStatus.Open,
        SNACKBAR_TYPES.Error,
        res.data.markNotificationAsReadByBatch.message,
        setSnackBarOpen,
        setSnackBarType,
        setSnackBarMessage,
      );
      dispatch(markReadNotifiesFailed());
    }
  }
}

export const handleLinkClick = (history: any, uri: string) => {
  history.push(uri);
}
