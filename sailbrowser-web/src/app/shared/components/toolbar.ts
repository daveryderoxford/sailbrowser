import { Component, booleanAttribute, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BackButtonDirective } from './back-directive/back-button.direcrtive';
import { SidenavService } from '../services/sidenav.service';

@Component({
   selector: 'app-toolbar',
   template: `
<mat-toolbar class=app-toolbar>
   @if (showBack()) {
      <button mat-icon-button navigateBack>
        <mat-icon>arrow_back</mat-icon>
      </button>
   } @else {
    <button
      mat-icon-button
      (click)="sidenavService.toggle()"
      aria-label="Toggle sidenav">
      <mat-icon>menu</mat-icon>
    </button>
  }
   {{title()}}
   <div class=spacer></div>
   <ng-content/>
</mat-toolbar>
    `,
   imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, BackButtonDirective],
   styles: ['.spacer { flex: 1 1 auto; }']

})
export class Toolbar {

   title = input('');
   showBack = input(false, { transform: booleanAttribute });

   protected sidenavService = inject(SidenavService);

}
