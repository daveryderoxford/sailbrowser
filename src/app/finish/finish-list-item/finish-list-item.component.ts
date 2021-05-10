import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonItemOption, IonItemSliding } from '@ionic/angular';
import { RaceResult } from 'app/competitor/@store/competitor.model';

@Component({
  selector: 'app-finish-list-item',
  templateUrl: './finish-list-item.component.html',
  styleUrls: ['./finish-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishListItemComponent implements OnInit {

  @ViewChild('lapexpand') lapexpand!: ElementRef;

  constructor() { }

  @Input() comp!: RaceResult;
  @Output() finish = new EventEmitter();
  @Output() lap = new EventEmitter();
  @Output() approaching = new EventEmitter();
  @Output() top = new EventEmitter();
  @Output() retired = new EventEmitter();

  ngOnInit(): void {
  }

  finishSwipe(button: IonItemSliding) {
    this.finish.emit();
    button.close();
  }

  lapSwipe(button: IonItemSliding) {
    this.lap.emit();
    button.close();
  }

}
