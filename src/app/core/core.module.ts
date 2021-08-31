import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestoService } from './services/gastos/presupuesto.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PresupuestoService
  ]
})
export class CoreModule { }
