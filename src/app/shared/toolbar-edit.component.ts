import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-edit',
  template: `
  <ion-toolbar color=primary>
    <ion-buttons slot="start">
      <ion-button (click)="cancel.emit()">Cancel</ion-button>
    </ion-buttons>

     <ng-content> </ng-content>

    <ion-buttons slot="primary">
      <ion-button [disabled]="saveDisabled" (click)="save.emit()">Done</ion-button>
    </ion-buttons>
  </ion-toolbar>
  `,
  styles: [
  ]
})
export class ToolbarEditComponent implements OnInit {

  @Input() saveDisabled = false;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
