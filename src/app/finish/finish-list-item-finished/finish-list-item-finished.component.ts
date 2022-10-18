import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Result } from 'app/competitor/@store/result.model';

@Component({
  selector: 'app-finish-list-item-finished',
  templateUrl: './finish-list-item-finished.component.html',
  styleUrls: ['./finish-list-item-finished.component.css']
})
export class FinishListItemFinishedComponent implements OnInit {

  @Input() result!: Result;
  @Output() stillRacing = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
