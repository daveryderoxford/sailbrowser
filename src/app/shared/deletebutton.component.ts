import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-deletebutton',
  template: `
   <div padding>
        <ion-button color=danger (click)='onDelete()'>Delete</ion-button>
    </div>
  `,
  styles: [
  ]
})
export class DeletebuttonComponent implements OnInit {

  @Input() message = '';
  @Output() deleteConfirmed = new EventEmitter();

  constructor(private alertCntl: AlertController) { }

  ngOnInit(): void {
  }

  async onDelete() {

      const alert = await this.alertCntl.create({
          message: this.message,
          buttons: [
              {
                  text: 'Delete',
                  handler: () => this.doDelete()
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log('Delete canceled');
                  }
              }
          ]
      });

      await alert.present();

  }

  doDelete() {
    this.deleteConfirmed.emit();
  }
}
