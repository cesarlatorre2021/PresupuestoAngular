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
import { InformacionDetalleComponent } from './components/informacion/informacion-detalle.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DatePipe } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    DetallePresupuestoComponent, NavComponent, InformacionDetalleComponent
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
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    LayoutModule,
    ChartModule,
    CardModule
  ],
  providers: [MessageService, ConfirmationService, DatePipe]
})
export class DetalleModule { }
