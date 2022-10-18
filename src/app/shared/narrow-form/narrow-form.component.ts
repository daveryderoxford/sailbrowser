import { IndexOutOfBoundException } from '@angular-devkit/schematics/src/utility/update-buffer';
import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-narrow-form',
  templateUrl: './narrow-form.component.html',
  styleUrls: ['./narrow-form.component.scss']
})
export class NarrowFormComponent implements OnInit {

  @Input() title = '';

  constructor(public platform: Platform) { }

  ngOnInit(): void {
  }

}
