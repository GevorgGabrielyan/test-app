import { NgModule } from '@angular/core';
import { GamingPageRoutingModule } from './gaming-page-routing.module';

import { MoveDirective } from './move.directive';
import { GameService } from './services/game.service';
import { GamingPageComponent } from './gaming-page.component';

@NgModule({
  declarations: [
    GamingPageComponent,
    MoveDirective
  ],
  imports: [
    GamingPageRoutingModule
  ],
  providers: [GameService]
})
export class GamingPageModule { }
