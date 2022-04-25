import { createAction, props } from '@ngrx/store';

export const LOGIN_START = createAction(
  '[Auth Component] LOGIN_START',
  props<{ payload: { email: string; password: string } }>()
);

export const AUTH_SUCCESS = createAction(
  '[Auth Component] AUTH_SUCCESS',
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    };
  }>()
);

export const AUTH_FAIL = createAction(
  '[Auth Component] AUTH_FAIL',
  props<{ payload: string }>()
);

export const AUTO_LOGIN = createAction('[Auth Component] AUTO_LOGIN');

export const LOGOUT = createAction('[Auth Component] LOGOUT');

export const AUTO_LOGOUT = createAction('[Auth Component] AUTO_LOGOUT');

export const SIGNUP_START = createAction(
  '[Auth Component] SIGNUP_START',
  props<{ payload: { email: string; password: string } }>()
);
