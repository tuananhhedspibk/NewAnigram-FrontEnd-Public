import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILED,
  AuthActionTypes,
} from './types';

export const signUpRequest = (): AuthActionTypes => {
  return {
    type: SIGNUP_REQUEST,
  };
}

export const signUpSuccess = (): AuthActionTypes => {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export const signUpFailed = (): AuthActionTypes => {
  return {
    type: SIGNUP_FAILED,
  };
}

export const signInRequest = (): AuthActionTypes => {
  return {
    type: SIGNIN_REQUEST,
  };
}

export const signInSuccess = (): AuthActionTypes => {
  return {
    type: SIGNIN_SUCCESS,
  };
}

export const signInFailed = (): AuthActionTypes => {
  return {
    type: SIGNIN_FAILED,
  };
}

export const signOutRequest = (): AuthActionTypes => {
  return {
    type: SIGNOUT_REQUEST,
  };
}

export const signOutSuccess = (): AuthActionTypes => {
  return {
    type: SIGNOUT_SUCCESS,
  };
}

export const signOutFailed = (): AuthActionTypes => {
  return {
    type: SIGNOUT_FAILED,
  };
}
