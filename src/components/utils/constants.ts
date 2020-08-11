export const ROUTES = {
  Home: '/home',
  Root: '/',
  Profile: '/mypage',
  Settings: '/settings',
  SignIn: '/signin',
  SignUp: '/signup',
  Users: '/users',
  Posts: '/posts',
  ActiveAccount: '/activeaccount',
  SendActiveMail: '/sendactivemail',
  SuggestFriends: '/suggestfriends',
};

export const API_ROUTES = {
  GraphQL: 'graphql',
  Subscriptions: 'subscriptions',
};

export const WEB_HOST = 'http://localhost:5000';
export const API_HOST = 'http://localhost:4000';
export const WS_HOST = 'ws://localhost:4000';

export const MAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_CHECKING_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const DEFAULT_IMAGES = {
  Avatar: '../../assets/images/default_ava.png',
  NotFound: '../../assets/images/notfound.svg',
};

export const JWT_TOKEN = 'jwt-token';
export const USER_INFO = 'user-info';
export const USER_SIGNUP_EMAIL = 'user-signup-mail';

export const BATCH_AVATARS_SIZE = 5;
export const BATCH_COMMENTS_SIZE = 5;

export const LOG_TYPES = {
  Info: 0,
  Error: 1,
};

export const SUCCESS_MESSAGES = {
  Authen: {
    SignIn: 'SignIn successfully',
    SignUp: 'SignUp successfully',
  },
  Post: {
    Create: 'Create post successfully',
  },
  User: {
    Edit: 'Edit user successfully'
  }
};

export const SNACKBAR_AUTO_HIDE_DURATION = 3000;
export const SNACKBAR_TYPES = {
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
  Success: 'success',
};
export const NOTIFICATION_TYPES = {
  CommentPost: 0,
  LikePost: 1,
  Follow: 2,
};

export const SCROLL_Y_POSITION = {
  Top: 'top',
  InsideBody: 'insideBody',
};

export const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
export const HOUR_IN_MILISECONDS = 60 * 60 * 1000;
export const MINUTE_IN_MILISECONDS = 60 * 1000;

export const MAX_POST_CONTENT_DISPLAY_LENGTH = 120;
export const MAX_NEW_COMING_POSTS_QUEUE_LENGTH = 5;

export const FOLLOW_INFO_DIALOG_TITLES = {
  Followings: 'Followings',
  Followers: 'Followers',
};

export enum PopupStatus {
  Open,
  Close,
};

export const GENERAL_MESSAGES = {
  Follow: {
    NoFollowings: 'Be active my friend, you have no followings now',
    NoFollowers: 'Share more moments, you will be famous',
  },
  Notification: {
    Follow: 'Check your follower',
    Post: 'Check your post',
  },
};

export const ERROR_MESSAGES = {
  Authen: {
    EmailPasswordWrong: 'Email or password was wrong',
    UserDoesNotExist: 'User does not exist',
  },
  Common: {
    WrongParams: 'Wrong parameters',
  },
  Post: {
    Fetch: 'Fetch posts failed, please try again',
    Create: 'Create post failed',
    Delete: 'Delete post failed',
    Like: 'Like post failed',
    UnLike: 'UnLike post failed',
    NoImages: 'Haven\'t uploaded any images',
    MultipleImages: 'Cannot upload multiple images together',
    CropImage: {
      HaveNotCropped: 'Haven\'t cropped image',
    }
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

export type UploadedImage = {
  plainObject: File;
  url: string;
};
