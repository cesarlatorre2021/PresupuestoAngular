import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePresupuestoComponent } from './components/detalle/detalle-presupuesto.component';
import { NavComponent } from './components/nav/nav.component';
import { InformacionDetalleComponent } from './components/informacion/informacion-detalle.component';                      

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'view',
        component: DetallePresupuestoComponent
      },
      {
        path: 'info',
        component: InformacionDetalleComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
