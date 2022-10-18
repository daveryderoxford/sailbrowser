import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-standard-content',
  templateUrl: './standard-content.component.html',
  styleUrls: ['./standard-content.component.scss']
})
export class StandardContentComponent implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit(): void {
  }

}
