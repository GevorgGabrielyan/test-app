import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  private pastWay: Subject<{ step: number }> = new Subject();

  public pastWaySubmit(): Subject<{ step: number }> {
    return this.pastWay;
  }

  public submitPastWay(value?: { step: number }): void {
    this.pastWay.next(value);
  }
}
