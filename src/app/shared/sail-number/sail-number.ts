import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

/*
Standard header component containing menu icon.
*/
@Component({
    selector: 'sailnumber',
    templateUrl: 'sail-number.html',
    styleUrls: ['sail-number.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })

    export class SailNumberComponent implements OnInit {

        @Input() num = 0;

        public s1 = '';
        public s2 = '';
        public shortNumber: boolean = false;

        constructor() {
        }

        ngOnInit() {
          const s = this.num.toString();
          this.shortNumber = (s.length < 4);
          this.s1 = s.slice(0, s.length - 3);
          this.s2 = s.slice(-3);
        }
    }
