import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CurrentRaces } from 'app/results-input/@store/current-races-store';
import { Toolbar } from 'app/shared/components/toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  imports: [
    Toolbar,
    MatButtonModule,
    RouterLink,
    MatListModule,
    DatePipe,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly currentRacesStore = inject(CurrentRaces);
}