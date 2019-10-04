import { Component, OnInit } from '@angular/core';
import {StorageKey} from '../gaming-page/costants/StorageKey';

@Component({
  selector: 'app-max-result-page',
  templateUrl: './max-result-page.component.html',
  styleUrls: ['./max-result-page.component.less']
})
export class MaxResultPageComponent implements OnInit {
  public way = 0;
  public steps = 0;
  public info: string;

  ngOnInit() {
    const info = JSON.parse(localStorage.getItem(StorageKey.NAME));
    this.way = info.way;
    this.steps = info.steps;
    this.getMaxResult();
  }

  public getMaxResult(): void {
    this.info = '';
    if (this.way) {
      this.info = `Max way: ${this.way}px, Max steps: ${this.steps}`;
    }
  }
}
