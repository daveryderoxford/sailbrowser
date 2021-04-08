import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-back',
  template: `
  <ion-toolbar color=primary>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
    <ion-title>{{title}}</ion-title>
    <ion-buttons slot="end">
       <ng-content></ng-content>
     </ion-buttons>
  </ion-toolbar>
  `,
  styles: []

})
export class ToolbarBackComponent implements OnInit {

  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
