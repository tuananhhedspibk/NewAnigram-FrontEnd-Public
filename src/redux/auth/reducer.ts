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
  AuthState,
} from './types';

const initState: AuthState = {
  isAuthenticating: false,
  isAuthenticated: false,
  isSignOuting: false,
}

export const authReducer = (
  state = initState,
  action: any,
): AuthState => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        isAuthenticating: false,
      };
    }
    case SIGNIN_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
      };
    }
    case SIGNIN_FAILED: {
      return {
        ...state,
        isAuthenticating: false,
      };
    }
    case SIGNOUT_REQUEST: {
      return {
        ...state,
        isSignOuting: true,
      };
    }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        isSignOuting: false,
        isAuthenticated: false,
      };
    }
    case SIGNOUT_FAILED: {
      return {
        ...state,
        isSignOuting: false,
      };
    }
    default: {
      return state;
    }
  }
}
