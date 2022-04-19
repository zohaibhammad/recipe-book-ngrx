import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { exhaustMap, Observable, take, map } from 'rxjs';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     if (!user) return next.handle(request);

    //     const modifiedRequest = request.clone({
    //       params: new HttpParams().set('auth', user.token),
    //     });
    //     return next.handle(modifiedRequest);
    //   })
    // );
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) return next.handle(request);

        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
