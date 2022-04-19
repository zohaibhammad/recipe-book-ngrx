import { createAction, props } from '@ngrx/store';

export const LOGIN_START = createAction('[Auth Component] LOGIN_START');

export const LOGIN = createAction(
  '[Auth Component] LOGIN',
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    };
  }>()
);

export const LOGOUT = createAction('[Auth Component] LOGOUT');
