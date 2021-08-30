import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosService } from './services/gastos/gastos.service';
import { IngresosService } from './services/ingresos/ingresos.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GastosService,
    IngresosService
  ]
})
export class CoreModule { }
