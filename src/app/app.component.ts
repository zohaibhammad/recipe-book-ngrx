import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent
  implements
    OnInit,
    DoCheck,
    OnChanges,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.AUTO_LOGIN());
    // this.authService.autoLogin();
    // console.log('OnInit');
  }
  ngDoCheck(): void {
    // this.authService.autoLogout();
    // console.log('DoCheck');
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('OnChanges');
  }
  ngAfterContentInit(): void {
    // console.log('AfterContentInit');
  }
  ngAfterContentChecked(): void {
    // console.log('AfterContentChecked');
  }
  ngAfterViewInit(): void {
    // console.log('AfterViewInit');
  }
  ngAfterViewChecked(): void {
    // console.log('AfterViewChecked');
  }
}
