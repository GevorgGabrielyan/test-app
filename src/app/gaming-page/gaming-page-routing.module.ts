import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamingPageComponent } from './gaming-page.component';

const routes: Routes = [
  {
    path: '',
    component: GamingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingPageRoutingModule {}
