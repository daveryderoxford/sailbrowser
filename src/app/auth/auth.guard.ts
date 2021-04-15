import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthQuery } from './@store/auth.query';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authQuery: AuthQuery, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authQuery.isLoggedIn$.pipe(
      take(1),
      tap(authenticated => {
        if (!authenticated) {
          // set query parameter returnUrl to redirect to the target url
          const redirectQueryParame = {
            queryParams: { returnUrl: state.url }
          };
          this.router.navigate(['/auth/login'], redirectQueryParame);
        }
      })
    );
  }

}
