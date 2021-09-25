import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePresupuestoComponent } from './components/detalle/detalle-presupuesto.component';
import { NavComponent } from './components/nav/nav.component';
import { InformacionDetalleComponent } from './components/informacion-gastos/informacion-detalle.component';
import { InformacionIngresosComponent } from './components/informacion-ingresos/informacion-ingresos.component';              

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'view/:id',
        component: DetallePresupuestoComponent
      },
      {
        path: 'info-gastos/:id',
        component: InformacionDetalleComponent
      },
      {
        path: 'info-ingresos/:id',
        component: InformacionIngresosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
