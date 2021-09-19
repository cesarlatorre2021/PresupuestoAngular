import { Component, OnInit, ChangeDetectionStrategy, } from '@angular/core';
import { Router } from '@angular/router';
import { PresupuestoService } from '../../core/services/gastos/presupuesto.service';
import { Autenticacion } from 'src/app/core/models/autenticacion.model';
import { MessageService } from 'primeng/api';
import { Registro } from './../../core/models/registro.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [MessageService]
})
export class InicioComponent implements OnInit {

  usuario: string;
  password: string;
  autenticacion: Autenticacion;
  value: boolean = false;
  dialog: boolean;
  submitted: boolean;
  registros: Registro[];
  registro: Registro;
  passwordRegistro: string;
  repeatPasswordRegistro: string;

  constructor(
    private router: Router,
    private presupuestoService: PresupuestoService, 
    private messageService: MessageService, 
  ) { 
    this.registro = {}
  }

  ngOnInit(): void {
  }

  openNew() {
    this.dialog = true;
  }

  autenticar(){
    this.value = true;
    this.presupuestoService.getAutenticacion(this.usuario, this.password).subscribe(autenticacion => {
      this.autenticacion = autenticacion;
      console.log(autenticacion);

      if(autenticacion.estado == 'OK'){
        this.router.navigate(['usuario', this.autenticacion.id, 'view', this.autenticacion.id]);
      }else{
        this.messageService.add({key:'mensajeAutenticacion',severity:'error', detail: 'Usuario y/o contraseña erroneos'});
        this.value = false;
      }

    });
    
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  saveProduct() {
    if(this.passwordRegistro == this.repeatPasswordRegistro){
      this.registro.idUsuario = this.createId();
      this.registro.password = this.passwordRegistro;
      this.presupuestoService.createRegistro(this.registro).then(data => this.registro = data);
      this.messageService.add({key:'mensajePassword', severity:'success', detail: 'Se creó el registro satisfactoriamente'});
      console.log(this.registro);
    }else{
      this.messageService.add({key:'mensajePassword', severity:'error', detail: 'Las contraseñas no coinciden'});
    }
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 10; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
