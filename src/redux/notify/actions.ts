import {
  FETCH_NOTIFIES_REQUEST,
  FETCH_NOTIFIES_SUCCESS,
  FETCH_NOTIFIES_FAILED,
  ADD_NOTIFY_REQUEST,
  ADD_NOTIFY_FAILED,
  MARK_READ_NOTIFIES_REQUEST,
  MARK_READ_NOTIFIES_FAILED,
  MARK_READ_NOTIFY_REQUEST,
  MARK_READ_NOTIFY_FAILED,
  RESET_STATE_REQUEST,
  EMPTY_STATUS_REQUEST,
  NotifyActionTypes,
} from './types';

export const fetchNotifiesRequest = (): NotifyActionTypes => {
  return {
    type: FETCH_NOTIFIES_REQUEST,
  };
}

export const fetchNotifiesSuccess = (
  notifies: any
): NotifyActionTypes => {
  return {
    type: FETCH_NOTIFIES_SUCCESS,
    notifies,
  };
}

export const fetchNotifiesFailed = (): NotifyActionTypes => {
  return {
    type: FETCH_NOTIFIES_FAILED,
  };
}

export const addNotifyRequest = (newNotify: any): NotifyActionTypes => {
  return {
    type: ADD_NOTIFY_REQUEST,
    newNotify,
  };
}

export const addNotifyFailed = (): NotifyActionTypes => {
  return {
    type: ADD_NOTIFY_FAILED,
  };
}

export const markReadNotifiesRequest = (): NotifyActionTypes => {
  return {
    type: MARK_READ_NOTIFIES_REQUEST,
  };
}

export const markReadNotifiesFailed = (): NotifyActionTypes => {
  return {
    type: MARK_READ_NOTIFIES_FAILED,
  };
}

export const markReadNotifyRequest = (notifyId: string): NotifyActionTypes => {
  return {
    type: MARK_READ_NOTIFY_REQUEST,
    notifyId,
  };
}

export const markReadNotifyFailed = (): NotifyActionTypes => {
  return {
    type: MARK_READ_NOTIFY_FAILED,
  };
}

export const resetStateRequest = (): NotifyActionTypes => {
  return {
    type: RESET_STATE_REQUEST,
  };
}

export const emptyStatusRequest = (): NotifyActionTypes => {
  return {
    type: EMPTY_STATUS_REQUEST,
  };
}
