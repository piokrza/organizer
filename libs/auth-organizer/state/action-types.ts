export enum ActionTypes {
  USER_AUTHENTICATED = '[Auth] User authenticated',
  USER_NOT_AUTHENTICATED = '[Auth] User not authenticated',

  SIGN_IN_WITH_GOOGLE = '[Auth] Sign in with Google',
  SIGN_IN_WITH_GOOGLE_SUCCESS = '[Auth] Sign in with Google Success',
  SIGN_IN_WITH_GOOGLE_FAILURE = '[Auth] Sign in with Google Failure',

  SIGN_OUT = '[Auth] Sign out',

  SIGN_IN_WITH_EMAIL_AND_PASSWORD = '[Auth] Sign in with email and password',
  SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS = '[Auth] Sign in with email and password success',
  SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE = '[Auth] Sign in with email and password failure',

  SIGN_UP_WITH_EMAIL_AND_PASSWORD = '[Auth] Sign up with email and password',
  SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS = '[Auth] Sign up with email and password success',
  SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILURE = '[Auth] Sign up with email and password failure',

  LOAD_USER_DATA = '[Auth] Load User',
  LOAD_USER_DATA_SUCCESS = '[Auth] Load User success',
  LOAD_USER_DATA_FAILURE = '[Auth] Load User failure',

  UPDATE_ACCOUNT = '[Auth] Update account',
  UPDATE_ACCOUNT_SUCCESS = '[Auth] Update account success',
  UPDATE_ACCOUNT_FAILURE = '[Auth] Update account failure',

  RESET_ERROR_MESSAGE = '[Auth] Reset error message',
}
