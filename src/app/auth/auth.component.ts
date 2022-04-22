import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  signupForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
  authSub: Subscription = new Subscription();
  // authObs: Observable<AuthResponse>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.authSub = this.store.select('auth').subscribe((authState) => {
      (this.isLoading = authState.loading), (this.error = authState.authError);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.error,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  onSubmit() {
    console.log(this.signupForm);
    if (!this.signupForm.valid) return;
    // this.isLoading = true;

    if (this.isLoginMode)
      // this.authObs = this.authService.login(this.signupForm.value);
      this.store.dispatch(
        AuthActions.LOGIN_START({ payload: this.signupForm.value })
      );
    // else this.authObs = this.authService.signup(this.signupForm.value);
    else
      this.store.dispatch(
        AuthActions.SIGNUP_START({ payload: this.signupForm.value })
      );

    // this.authObs.subscribe({
    //   next: (data) => {
    //     console.log('LOGIN', data);
    //     this.isLoading = false;
    //     this.router.navigate(['./recipes']);
    //   },
    //   error: (errorMessage) => {
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   },
    // });

    this.signupForm.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
