import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/autenticacion',
    pathMatch: 'full',
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'usuario/:id',
    loadChildren: () => import('./detalle-presupuesto/detalle-presupuesto.module').then(m => m.DetalleModule)
  },
    {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.modules').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
