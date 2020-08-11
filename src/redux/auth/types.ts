export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SIGNIN_FAILED = 'SIGNIN_FAILED';
export const SIGNOUT_FAILED = 'SIGNOUT_FAILED';

export interface AuthState {
  isAuthenticating: Boolean;
  isAuthenticated: Boolean;
  isSignOuting: Boolean;
}

export interface AuthUser {
  id: String;
  email: String;
}

export interface AuthResponse {
  jwtToken: String;
  user: AuthUser;
}

interface SignUpRequestAction {
  type: string;
}

interface SignUpSuccessAction {
  type: string;
  payload: AuthResponse;
}

interface SignUpFailedAction {
  type: string;
}

interface SignInRequestAction {
  type: string;
}

interface SignInSuccessAction {
  type: string;
  payload: AuthResponse;
}

interface SignInFailedAction {
  type: string;
}

interface SignOutRequestAction {
  type: string;
}

interface SignOutSuccessAction {
  type: string;
  payload: AuthResponse;
}

interface SignOutFailedAction {
  type: string;
  payload: AuthResponse;
}

export type AuthActionTypes =
  SignUpRequestAction | SignUpSuccessAction |
  SignUpFailedAction | SignInRequestAction |
  SignInSuccessAction | SignInFailedAction |
  SignOutRequestAction | SignOutSuccessAction |
  SignOutFailedAction;
