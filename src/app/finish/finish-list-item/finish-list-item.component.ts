import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonItemOption, IonItemSliding } from '@ionic/angular';
import { Result } from 'app/competitor/@store/result.model';

@Component({
  selector: 'app-finish-list-item',
  templateUrl: './finish-list-item.component.html',
  styleUrls: ['./finish-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishListItemComponent implements OnInit {

  @ViewChild('lapexpand') lapexpand!: ElementRef;

  @Input() result!: Result;
  @Output() finish = new EventEmitter();
  @Output() lap = new EventEmitter();
  @Output() approaching = new EventEmitter();
  @Output() top = new EventEmitter();
  @Output() retired = new EventEmitter();
  @Output() didNotStart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  finishSwipe(button: IonItemSliding) {
    this.finish.emit(this.result);
    button.close();
  }

  lapSwipe(button: IonItemSliding) {
    this.lap.emit(this.result);
    button.close();
  }

}
