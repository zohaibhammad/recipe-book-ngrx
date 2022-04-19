import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.LOGIN, (state, { payload }) => ({
    ...state,
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
  }))
);
