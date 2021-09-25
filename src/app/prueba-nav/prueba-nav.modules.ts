import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaNavComponent } from './components/prueba-nav.component';

import { PruebaNavRoutingModule } from './prueba-nav-routing.modules';

@NgModule({
  declarations: [
    PruebaNavComponent,
  ],
  imports: [
    CommonModule,
    PruebaNavRoutingModule
  ]
})
export class PruebaNavModule {

}
