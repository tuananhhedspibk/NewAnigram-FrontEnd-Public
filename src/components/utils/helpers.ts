import {
  LOG_TYPES,
  MAIL_REGEX,
  PASSWORD_CHECKING_REGEX,
  PopupStatus,
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

export const handleLinkClick = (history: any, uri: string) => {
  history.push(uri);
}
