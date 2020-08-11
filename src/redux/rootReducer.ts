import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { notifyReducer } from './notify/reducer';

export default combineReducers({
  auth: authReducer,
  notify: notifyReducer,
});
