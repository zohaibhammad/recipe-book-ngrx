import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleError = (errorRes: HttpErrorResponse) => {
  let errorMessage = 'An error has occuerd';
  if (errorRes.error && errorRes.error.error) {
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
  }
  return of(AuthActions.AUTH_FAIL({ payload: errorMessage }));
};

const handleAuthentication = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );

  localStorage.setItem('userData', JSON.stringify(user));

  return AuthActions.AUTH_SUCCESS({
    payload: {
      email: user.email,
      userId: user.id,
      token: user.token,
      expirationDate,
    },
  });
};

@Injectable()
export class AuthEffects {
  // @Effect()
  // authLogin = this.actions$.pipe(
  //   ofType(AuthActions.LOGIN_START),
  //   switchMap((authData) => {
  //     return this.http
  //       .post<AuthResponse>(
  //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //           environment.FIREBASE_API_KEY,
  //         {
  //           email: authData.payload.email,
  //           password: authData.payload.password,
  //           returnSecureToken: true,
  //         }
  //       )
  //       .pipe(
  //         map((resData) => {
  //           const expirationDate = new Date(
  //             new Date().getTime() + +resData.expiresIn * 1000
  //           );
  //           return AuthActions.LOGIN({
  //             payload: {
  //               email: resData.email,
  //               userId: resData.localId,
  //               token: resData.idToken,
  //               expirationDate,
  //             },
  //           });
  //         }),
  //         catchError((errorRes) => {
  //           let errorMessage = 'An error has occuerd';
  //           if (errorRes.error && errorRes.error.error) {
  //             switch (errorRes.error.error.message) {
  //               case 'EMAIL_EXISTS':
  //                 errorMessage = 'This email already exists';
  //                 break;
  //               case 'OPERATION_NOT_ALLOWED':
  //                 errorMessage =
  //                   'Password sign-in is disabled for this project.';
  //                 break;
  //               case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //                 errorMessage =
  //                   'We have blocked all requests from this device due to unusual activity. Try again later.';
  //                 break;
  //               case 'EMAIL_NOT_FOUND':
  //                 errorMessage =
  //                   'There is no user record corresponding to this identifier. The user may have been deleted.';
  //                 break;
  //               case 'INVALID_PASSWORD':
  //                 errorMessage =
  //                   'The password is invalid or the user does not have a password.';
  //                 break;
  //               case 'USER_DISABLED':
  //                 errorMessage =
  //                   'The user account has been disabled by an administrator.';
  //                 break;
  //             }
  //           }
  //           return of(AuthActions.LOGIN_FAIL({ payload: errorMessage }));
  //         })
  //       );
  //   })
  // );

  // @Effect({ dispatch: false })
  // authSuccess = this.actions$.pipe(
  //   ofType(AuthActions.LOGIN),
  //   tap(() => {
  //     this.router.navigate(['/']);
  //   })
  // );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction) => {
        return this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.FIREBASE_API_KEY,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => handleAuthentication(resData)),
            catchError((error) => handleError(error))
          );
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData) => {
        return this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.FIREBASE_API_KEY,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => handleAuthentication(resData)),
            catchError((error) => handleError(error))
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) return { type: 'DUMMY' };

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          // this.user.next(loadedUser);
          return AuthActions.AUTH_SUCCESS({
            payload: {
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
            },
          });
        }
        return { type: 'DUMMY' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store$: Store<fromApp.AppState>
  ) {}
}
