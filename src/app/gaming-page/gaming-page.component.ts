import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { StorageKey } from './costants/StorageKey';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-gaming-page',
  templateUrl: './gaming-page.component.html',
  styleUrls: ['./gaming-page.component.less']
})
export class GamingPageComponent implements OnInit, OnDestroy {
  @ViewChild('bull', { static: false })
  public bull: ElementRef;

  public step = 10;
  public way = 0;
  public steps = 0;
  public speed = this.step;
  public info: string;

  private onDestroy$ = new Subject();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.pastWaySubmit().pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      this.way += value.step;
      this.steps++;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public incrementSpeed(): void {
    if (this.speed < this.step * 4) {
      this.speed += this.step;
    }
  }

  public decrementSpeed(): void {
    if (this.speed > this.step) {
      this.speed -= this.step;
    }
  }

  public getWay(): void {
    this.info = '';
    if (this.way) {
      this.info = `Way: ${this.way}px, Steps: ${this.steps}`;
    }
  }

  public save(): void {
    const maxResult = JSON.parse(localStorage.getItem(StorageKey.NAME)) || {};
    if ((maxResult.way || 0) < this.way) {
      const info = {
        way: this.way,
        steps: this.steps
      };
      localStorage.setItem(StorageKey.NAME, JSON.stringify(info));
    }
    this.resetElementStyles();
    this.getWay();
  }

  private resetElementStyles() {
    this.way = 0;
    this.steps = 0;
    this.bull.nativeElement.style.top = '0px';
    this.bull.nativeElement.style.left = '0px';
  }
}
