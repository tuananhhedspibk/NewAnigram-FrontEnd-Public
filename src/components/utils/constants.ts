export const ROUTES = {
  Home: '/home',
  Root: '/',
  SignIn: '/signin',
  SignUp: '/signup',
  SendActiveMail: '/sendactivemail',
};

export const MAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_CHECKING_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const JWT_TOKEN = 'jwt-token';
export const USER_INFO = 'user-info';
export const USER_SIGNUP_EMAIL = 'user-signup-mail';

export const LOG_TYPES = {
  Info: 0,
  Error: 1,
};

export const SNACKBAR_AUTO_HIDE_DURATION = 3000;
export const SNACKBAR_TYPES = {
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
  Success: 'success',
};

export enum PopupStatus {
  Open,
  Close,
};

export const ERROR_MESSAGES = {
  Authen: {
    EmailPasswordWrong: 'Email or password was wrong',
    UserDoesNotExist: 'User does not exist',
  },
  SystemError: 'Server has error(s)',
};


export const NOTIFY_STATE_STATUSES = {
  Init: 'Init',
  FetchingNotifies: 'FetchingNotifies',
  FetchNotifiesSuccess: 'FetchNotifiesSuccess',
  FetchNotifiesFailed: 'FetchNotifiesFailed',
  AddNotifySuccess: 'AddNotifySuccess',
  AddNotifyFailed: 'AddNotifyFailed',
  MarkReadNotifiesSuccess: 'MarkReadNotifiesSuccess',
  MarkReadNotifiesFailed: 'MarkReadNotifiesFailed',
  MarkReadNotifySuccess: 'MarkReadNotifySuccess',
  MarkReadNotifyFailed: 'MarkReadNotifyFailed',
  ResetStateSuccess: 'ResetStateSuccess',
};
