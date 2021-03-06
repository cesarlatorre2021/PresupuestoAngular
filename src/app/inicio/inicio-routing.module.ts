import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { InicioComponent } from './components/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
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
export class InicioRoutingModule {}
