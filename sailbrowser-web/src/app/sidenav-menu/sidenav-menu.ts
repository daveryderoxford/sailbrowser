import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav-menu',
  imports: [
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatExpansionModule,
],
  templateUrl: './sidenav-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    ::ng-deep .mat-expansion-panel-body {
      padding: 0 !important;
    }
  `]
})
export class SidenavMenu {
  private router = inject(Router);
  private sidenav = inject(MatSidenav);
  protected auth = inject(AuthService);

  async closeSidenav(url?: string[]) {
    if (url) {
      await this.router.navigate(url);
    }
    await this.sidenav.close();
  }

  async logout() {
    // navigate away from protected pages
    if (this.router.url.includes("admin")) {
      await this.router.navigate(["/"]);
    }

    await this.auth.signOut();
    await this.sidenav.close();
  }

  async contact() {
    await this.sidenav.close();
    window.location.href = "mailto:support@splitsbrowser.org.uk";
  }
}
