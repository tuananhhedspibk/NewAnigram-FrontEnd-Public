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
  NotifyState,
} from './types';

import {
  NOTIFY_STATE_STATUSES,
} from '../../components/utils/constants';

import { 
  getItemIndexById,
} from '../../components/utils/helpers';

const initState: NotifyState = {
  badgeData: 0,
  notifies: [],
  status: NOTIFY_STATE_STATUSES.Init,
  unreadNotifyIds: [],
};

export const notifyReducer = (
  state = initState,
  action: any,
): NotifyState => {
  switch (action.type) {
    case FETCH_NOTIFIES_REQUEST: {
      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.FetchingNotifies
      };
    }
    case FETCH_NOTIFIES_SUCCESS: {
      const unreadNotifyIds: any = [];
      
      action.notifies.forEach((notify: any) => {
        if (!notify.read) {
          unreadNotifyIds.push(notify.id);
        }
      });

      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.FetchNotifiesSuccess,
        notifies: action.notifies,
        unreadNotifyIds,
        badgeData: unreadNotifyIds.length,
      };
    }
    case FETCH_NOTIFIES_FAILED: {
      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.FetchNotifiesFailed,
      };
    }
    case ADD_NOTIFY_REQUEST: {
      const notifyIndex = getItemIndexById(
        state.notifies,
        action.newNotify.id
      );

      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.AddNotifySuccess,
        notifies: notifyIndex === -1
          ? [ action.newNotify, ...state.notifies ]
          : state.notifies,
        unreadNotifyIds: notifyIndex === -1
          ? [ action.newNotify.id, ...state.unreadNotifyIds ]
          : state.unreadNotifyIds,
        badgeData: notifyIndex === -1
          ? state.badgeData + 1
          : state.badgeData
      };
    }
    case ADD_NOTIFY_FAILED: {
      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.AddNotifyFailed,
      };
    }
    case MARK_READ_NOTIFIES_REQUEST: {
      const notifies = state.notifies.slice(0);
      notifies.forEach((notify: any) => {
        if (!notify.read) {
          notify.read = true;
        }
      })
      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.MarkReadNotifiesSuccess,
        notifies,
        unreadNotifyIds: [],
        badgeData: 0,
      };
    }
    case MARK_READ_NOTIFIES_FAILED: {
      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.MarkReadNotifiesFailed,
      };
    }
    case MARK_READ_NOTIFY_REQUEST: {
      const notifies = state.notifies.slice(0);
      const notifyIndex = getItemIndexById(notifies, action.notifyId);

      const unreadNotifyIds = state.unreadNotifyIds.slice(0);
      const unreadNotifyIdIndex = unreadNotifyIds.indexOf(
        action.notifyId,
      );

      if (!notifies[notifyIndex].read) {
        notifies[notifyIndex].read = true;
      }

      if (unreadNotifyIdIndex > -1) {
        unreadNotifyIds.splice(unreadNotifyIdIndex, 1);
      }

      console.log(unreadNotifyIds);

      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.MarkReadNotifySuccess,
        notifies,
        unreadNotifyIds,
        badgeData: unreadNotifyIds.length,
      }
    }
    case MARK_READ_NOTIFY_FAILED: {
      return {
        ...state,
        status: NOTIFY_STATE_STATUSES.MarkReadNotifyFailed,
      }
    }
    case RESET_STATE_REQUEST: {
      return {
        badgeData: 0,
        notifies: [],
        status: NOTIFY_STATE_STATUSES.Init,
        unreadNotifyIds: [],
      };
    }
    case EMPTY_STATUS_REQUEST: {
      return {
        ...state,
        status: '',
      };
    }
    default: {
      return state;
    }
  }
}
