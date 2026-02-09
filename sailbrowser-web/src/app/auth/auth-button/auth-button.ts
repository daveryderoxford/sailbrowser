import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-button',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './auth-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButton {

  protected authService = inject(AuthService);
  private router = inject(Router);

  async logout() {
    await this.authService.signOut();
    await this.router.navigateByUrl('auth/login');
  }
}
