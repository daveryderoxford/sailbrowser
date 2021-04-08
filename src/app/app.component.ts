import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery, AuthService } from './auth';
import { Club } from './clubs/store/club.model';
import { ClubsQuery } from './clubs/store/clubs.query';
import { ClubsService } from './clubs/store/clubs.service';
// const { SplashScreen } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public isAuthorised$: Observable<boolean>;
  public club$: Observable<Club | undefined>;


  public raceOfficerPages = [
    { title: 'Pre Start', url: '/home', icon: 'home' },
    { title: 'Start', url: '/start', icon: 'flag' },
    { title: 'Finish', url: '/finish', icon: 'stopwatch' },
    { title: 'Results Entry', '/results-entry': '', icon: 'calculator' },
  ];

  public infoPages = [
    { title: 'Calander', url: '', icon: 'calendar' },
    { title: 'Results', url: '/results', icon: 'copy' },
  ];

  public adminPages = [
    { title: 'Series', url: 'races', icon: '' },
  /*  { title: 'Fleets', url: 'admin/fleets', icon: '' },
    { title: 'Classes', url: 'admin/classes', icon: '' }, */
    { title: 'Boats', url: 'boats', icon: '' },
  /*  { title: 'Club Details', url: 'admin/club', icon: '' },
    { title: 'Temp System Admin', url: 'admin/sysadmin', icon: '' }, */
  ];

  constructor(private auth: AuthService,
              public authQuery: AuthQuery,
              private clubsService: ClubsService,
              private clubsQuery: ClubsQuery,
              private router: Router) {
    this.initializeApp();
    this.isAuthorised$ = this.authQuery.isLoggedIn$;
    this.club$ = this.clubsQuery.selectActive();
  }

  initializeApp() {
    // SplashScreen.hide();
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    console.log(path);
    if (path !== undefined) {
    //  this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  public login() {
     this.router.navigate(['/auth/login']);
  }

  public logout() {
    this.auth.onSignout();
  }

  public changeClub() {
    // To do
  }
}

