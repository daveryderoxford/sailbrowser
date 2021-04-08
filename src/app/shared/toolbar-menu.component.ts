import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-menu',
  template: `
  <ion-toolbar color=primary>
  <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>
      {{title}}
    </ion-title>
    <ion-buttons slot="end">
       <ng-content></ng-content>
    </ion-buttons>
  </ion-toolbar>
  ` ,
  styles: [
  ]
})

export class ToolbarMenuComponent implements OnInit {

  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
