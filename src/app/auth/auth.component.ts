import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  signupForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
  authObs: Observable<AuthResponse>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.error,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    if (!this.signupForm.valid) return;
    this.isLoading = true;

    if (this.isLoginMode)
      this.authObs = this.authService.login(this.signupForm.value);
    else this.authObs = this.authService.signup(this.signupForm.value);

    this.authObs.subscribe({
      next: (data) => {
        console.log('LOGIN', data);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    this.signupForm.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
