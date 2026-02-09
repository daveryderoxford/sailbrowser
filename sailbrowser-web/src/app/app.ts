import { ChangeDetectionStrategy, Component, inject, OnInit, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { LazyInject } from './shared/services/lazy-injector';
import { SidenavService } from './shared/services/sidenav.service';
import { SidenavMenu } from "./sidenav-menu/sidenav-menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: 'app.scss',
  imports: [MatSidenavModule, RouterOutlet, SidenavMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  sidebarService = inject(SidenavService);
  private lazyInject = inject(LazyInject);

  sidenav = viewChild.required(MatSidenav);

  ngOnInit() {
    this.sidebarService.setSidenav(this.sidenav());
    this.cookieConsent();
  }

  private async cookieConsent() {
    if (!existsInLocalStorage('cookieConsent')) {
      const snackBar = await this.lazyInject.getProvider(() => import('@angular/material/snack-bar'), 'MatSnackBar');

      snackBar.open("This site uses cookies for analytics purposes.", "Accept").afterDismissed().subscribe(() => {
        saveToLocalStorage('cookieConsent', true);
      });
    }
  }
}

type LocalStorageKey = 'cookieConsent';

function saveToLocalStorage(key: LocalStorageKey, data: boolean) {
  if (data) {
    try {
      localStorage.setItem(key, data.toString());
    } catch (e: any) {
      console.log('App component: Error saving to local storage Key: ' + key + '   ' + e.message);
    }
  }
}

function existsInLocalStorage(key: LocalStorageKey): boolean {
  try {
    const str = localStorage.getItem(key);
    return str !== null;
  } catch (e: any) {
    console.log('App component: Error reading from local storage.  Key: ' + key + '   ' + e.message);
    return false;
  }
}

