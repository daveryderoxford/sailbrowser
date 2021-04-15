import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../@store/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  form: FormGroup;
  error = '';

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: AuthService) {

    this.form = this.fb.group({
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

  async changePassword() {

    const user = await this.service.user;
    const password = this.form.get('password')?.value;

    this.error = '';

    try {
      await user.updatePassword(password);
      this.router.navigateByUrl('/');

    } catch (error) {
      console.log('SignupComponent: Error updating password:' + error.code + '  ' + error.message);
      this.error = 'Error updating password';
    }
  }
}

