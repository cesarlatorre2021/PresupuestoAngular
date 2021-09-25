import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PruebaNavComponent } from './components/prueba-nav.component';

const routes: Routes = [
  {
    path: '',
    component: PruebaNavComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PruebaNavRoutingModule {}
