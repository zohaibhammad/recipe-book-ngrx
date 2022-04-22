import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.AUTH_SUCCESS, (state, { payload }) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      payload.email,
      payload.userId,
      payload.token,
      payload.expirationDate
    ),
  })),
  on(AuthActions.LOGOUT, (state, action) => ({
    ...state,
    user: null,
  })),
  on(AuthActions.LOGIN_START, (state, action) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.AUTH_FAIL, (state, { payload }) => ({
    ...state,
    user: null,
    authError: payload,
    loading: false,
  })),
  on(AuthActions.SIGNUP_START, (state, { payload }) => ({
    ...state,
    loading: true,
    authError: null,
  }))
);
