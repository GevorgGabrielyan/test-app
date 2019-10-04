import {Directive, ElementRef, HostListener, Input} from '@angular/core';

import { KeyCodes } from './costants/KeyCodes';
import { GameService } from './services/game.service';
import { IElementParams } from './interfaces/IElementParams';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective {
  private step: number;

  @Input()
  set appMove(step: number) {
    this.step = step;
  }

  private deg = 0;

  private elementParams: IElementParams;
  private parentParams: IElementParams;

  constructor(public el: ElementRef, private gameService: GameService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.getParams();
    this.move(event.keyCode);
  }

  private move(code: number): void {
    const isNotMaxTop = this.elementParams.top + this.elementParams.height < this.parentParams.height;
    const isNotMaxLeft = this.elementParams.left + this.elementParams.width < this.parentParams.width;

    switch (code) {
      case KeyCodes.W: this.el.nativeElement.style.top = this.elementParams.top > 0 ? `${this.elementParams.top - this.step}px` : 0;
                       if (this.elementParams.top) {
                         this.setPastInfo();
                       }
                       this.transformElement(-this.step);
                       break;
      case KeyCodes.A: this.el.nativeElement.style.left = this.elementParams.left > 0 ? `${this.elementParams.left - this.step}px` : 0;
                       if (this.elementParams.left) {
                         this.setPastInfo();
                       }
                       this.transformElement(-this.step);
                       break;
      case KeyCodes.S: this.el.nativeElement.style.top = isNotMaxTop ? `${this.elementParams.top + this.step}px`
        : `${this.parentParams.height - this.elementParams.height}px`;
                       if (isNotMaxTop) {
                         this.setPastInfo();
                       }
                       this.transformElement(this.step);
                       break;
      case KeyCodes.D: this.el.nativeElement.style.left = isNotMaxLeft ? `${this.elementParams.left + this.step}px`
        : `${this.parentParams.width - this.elementParams.width}px`;
                       if (isNotMaxLeft) {
                         this.setPastInfo();
                       }
                       this.transformElement(this.step);
                       break;
    }
  }

  private setPastInfo() {
    this.gameService.submitPastWay({ step: this.step });
  }

  private transformElement(step: number): void {
    this.deg += step;
    this.el.nativeElement.style.transform = `rotateZ(${this.deg}deg)`;
  }

  private getParams(): void {
    const element = this.el.nativeElement;
    const parentNode = element.parentNode;

    this.elementParams = {
      left: element.offsetLeft,
      top: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    this.parentParams = {
      width: parentNode.offsetWidth,
      height: parentNode.offsetHeight
    };
  }
}
