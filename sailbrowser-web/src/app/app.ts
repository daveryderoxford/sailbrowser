import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from "@angular/router";
import { LazyInject } from './shared/services/lazy-injector';
import { SidenavService } from './shared/services/sidenav.service';
import { SidenavMenu } from "./sidenav-menu/sidenav-menu";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: 'app.scss',
  imports: [MatSidenavModule, RouterOutlet, SidenavMenu, MatProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  sidebarService = inject(SidenavService);
  private lazyInject = inject(LazyInject);
  private router = inject(Router);

  sidenav = viewChild.required(MatSidenav);

  protected isLazyLoading = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof RouteConfigLoadStart || e instanceof RouteConfigLoadEnd),
      map(e => e instanceof RouteConfigLoadStart)
    ),
    { initialValue: false }
  );

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

