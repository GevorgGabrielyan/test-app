import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaxResultPageComponent} from './max-result-page/max-result-page.component';

const routes: Routes = [
  {
    path: '',
    component: MaxResultPageComponent
  },
  {
    path: 'game',
    loadChildren: () => import('./gaming-page/gaming-page.module').then(mod => mod.GamingPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
