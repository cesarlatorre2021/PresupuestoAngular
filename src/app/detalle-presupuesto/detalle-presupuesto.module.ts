import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './detalle-presupuesto-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { NavComponent }  from './components/nav/nav.component';
import { DetallePresupuestoComponent} from './components/detalle/detalle-presupuesto.component'
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetallePresupuestoComponent, NavComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    FormsModule,
    TableModule,
    SidebarModule,
    SplitterModule,
    PanelMenuModule,
    DividerModule,
    ReactiveFormsModule,
  ],
})
export class DetalleModule { }
