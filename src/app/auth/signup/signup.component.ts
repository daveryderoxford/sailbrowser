import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../store/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  error = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private service: AuthService) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMissMatch });

  }

  passwordMissMatch(g: FormGroup): any {
    const p1 = g.get('password') as AbstractControl;
    const p2 = g.get('confirmPassword') as AbstractControl;
    let ret: { [error: string]: any } = {};

    if ((p1.touched || p2.touched) &&
      (p1.value !== p2.value) &&
      (p2 !== null)) {
      ret = { passwordMissMatch: true };
    }

    return (ret);
  }

  async signup() {

    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    this.error = '';

    try {
      const credentials = await this.service.signup(email, password);

      // User is automatically signed in so get the current user and send verification email
      if (credentials && credentials.user) {
        credentials.user.sendEmailVerification();
      }

      this.router.navigateByUrl('/user');

    } catch (error) {
      console.log('SignupComponent: Error creating user code:' + error.code + '  ' + error.message);
      this.error = error.message;
    }
  }
}
