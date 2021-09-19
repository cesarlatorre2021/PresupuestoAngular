import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    InicioComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    MessageModule,
    ToastModule,
    RippleModule,
    MessagesModule,
    ProgressSpinnerModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    PasswordModule,
    ProgressBarModule
  ]
})
export class InicioModule {

}
