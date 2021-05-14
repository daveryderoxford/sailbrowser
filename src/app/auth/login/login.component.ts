import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { AuthService } from '../index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  loading = false;
  returnUrl = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private service: AuthService,
              private clubQuery: ClubsQuery) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });

    this.error = '';
  }

  async loginFormSubmit() {
    if (this.loginForm.valid) {
      await this.signInWith('EmailAndPassword', this.loginForm.value);
    }
  }

  async signInWith(provider: string, credentials?: any) {

    try {
      this.loading = true;
      this.error = '';

      switch (provider) {

        case 'EmailAndPassword':
          await this.service.signin(credentials.email, credentials.password);
          break;

        case 'Google':
          await this.service.signin('google');
          break;

        case 'Facebook':
          await this.service.signin('facebook');
          break;
      }
      this._handleSignInSuccess();
    } catch (err) {
      this._handleSigninError(err);
    } finally {
      this.loading = false;
    }
  }

  private _handleSigninError(err: any) {
    console.log('LoginComponent: Error loging in.  Error code:' + + err.code + '  ' + err.message);
    this.error = 'Login attempt failed';
  }

  private _handleSignInSuccess() {
    console.log('LoginComponent: Successful login');
    this.error = '';
    this.router.navigateByUrl(this.returnUrl);
  }
}
