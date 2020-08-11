export const FETCH_NOTIFIES_REQUEST = 'FETCH_NOTIFIES_REQUEST';
export const ADD_NOTIFY_REQUEST = 'ADD_NOTIFY_REQUEST';
export const MARK_READ_NOTIFIES_REQUEST = 'MARK_READ_NOTIFIES_REQUEST';
export const MARK_READ_NOTIFY_REQUEST = 'MARK_READ_NOTIFY_REQUEST';
export const RESET_STATE_REQUEST = 'RESET_STATE_REQUEST';
export const EMPTY_STATUS_REQUEST = 'EMPTY_STATUS_REQUEST';

export const FETCH_NOTIFIES_SUCCESS = 'FETCH_NOTIFIES_SUCCESS';

export const FETCH_NOTIFIES_FAILED = 'FETCH_NOTIFIES_FAILED';
export const ADD_NOTIFY_FAILED = 'ADD_NOTIFY_FAILED';
export const MARK_READ_NOTIFIES_FAILED = 'MARK_READ_NOTIFIES_FAILED';
export const MARK_READ_NOTIFY_FAILED = 'MARK_READ_NOTIFY_FAILED';

export interface NotifyState {
  status: string,
  notifies: any;
  unreadNotifyIds: any;
  badgeData: number;
}

interface FetchNotifiesRequestAction {
  type: string;
}

interface FetchNotifiesSuccessAction {
  type: string;
  notifies: any;
}

interface FetchNotifiesFailedAction {
  type: string;
}

interface AddNotifyRequestAction {
  type: string;
  newNotify: any;
}

interface AddNotifyFailedAction {
  type: string;
}

interface MarkReadNotifiesRequestAction {
  type: string;
}

interface MarkReadNotifiesSuccessAction {
  type: string;
}

interface MarkReadNotifiesFailedAction {
  type: string;
}

interface MarkReadNotifyRequestAction {
  type: string;
}

interface MarkReadNotifySuccessAction {
  type: string;
  notifyId: string;
}

interface MarkReadNotifyFailedAction {
  type: string;
}

interface ResetStateRequestAction {
  type: string;
}

interface EmptyStatusRequestAction {
  type: string;
}

export type NotifyActionTypes =
  FetchNotifiesRequestAction | FetchNotifiesSuccessAction |
  FetchNotifiesFailedAction | AddNotifyRequestAction |
  AddNotifyFailedAction | MarkReadNotifiesRequestAction |
  MarkReadNotifiesSuccessAction | MarkReadNotifiesFailedAction |
  MarkReadNotifyRequestAction | MarkReadNotifySuccessAction |
  MarkReadNotifyFailedAction | ResetStateRequestAction |
  EmptyStatusRequestAction;
