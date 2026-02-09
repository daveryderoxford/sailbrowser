
import { Component, effect, OnInit, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { UserData } from 'app/user/user';
import { UserDataService } from "app/user/user-data.service";
import { Toolbar } from "../shared/components/toolbar";
import { AuthService } from 'app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-user",
  templateUrl: "./user-page.html",
  styleUrls: ["./user-page.scss"],
  imports: [Toolbar, FlexModule, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatCheckboxModule]
})
export class UserPage {
  private afAuth = inject(AuthService);
  private router = inject(Router);
  private usd = inject(UserDataService);
  private snackBar = inject(MatSnackBar);

  userForm = new FormGroup({
    firstname: new FormControl('', { validators: [Validators.required] }),
    surname: new FormControl('', { validators: [Validators.required] }),
    club: new FormControl('', { validators: [Validators.minLength(2), Validators.maxLength(10)] }),
    nationality: new FormControl('', { validators: [Validators.required] }),
  });

  busy = signal(false);

  constructor() {

    effect(() => {
      const userData = this.usd.user();
      if (userData) {
        this.userForm.patchValue(userData);
      };
    });

    // Navigate away if we aare logged out
    effect(() => {
      if (!this.afAuth.loggedIn()) {
        this.router.navigate(["/"]);
      }
    });
  }

  async save() {

    this.busy.set(true);
    try {
      await this.usd.updateDetails(this.userForm.value as Partial<UserData>);
      console.log('UserComponnet: User results saved');
      this.userForm.reset();
      this.router.navigate(["/"]);
    } catch (e) {
      console.error('UserComponent: Error saving user results', e);
      this.snackBar.open("Error saving event details", "Dismiss");
    } finally {
      this.busy.set(false);
    }
  }

  canDeactivate(): boolean {
    return !this.userForm.dirty;
  }
}
