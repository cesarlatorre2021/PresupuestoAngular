import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PresupuestoService } from '../../../core/services/gastos/presupuesto.service';
import { Presupuesto } from 'src/app/core/models/presupuesto.model';
import { Sumatoria } from 'src/app/core/models/sumatoria.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-presupuesto',
  
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService,ConfirmationService,]
})
export class DetallePresupuestoComponent implements OnInit {

  presupuestoDialog: boolean;
  filtroDialog: boolean;
  presupuestos: Presupuesto[];
  presupuesto : Presupuesto;
  selectedPresupuestos: Presupuesto[];
  sumatoria : Sumatoria = {};
  sumatoriaMes : Sumatoria = {};
  submitted: boolean;
  statuses: any[];
  categoriasGastos: any[];
  categoriasIngresos: any[];
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  valorIngreso: number = 3000000;
  cols: any[];
  value: boolean = true;
  id: string;
  date: Date;
  fechaActual: Date = new Date();

  first = 0;
  rows = 10;

  suscription: Subscription;

  constructor(
    private presupuestoService: PresupuestoService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) { }

  ngOnInit(){    

    this.route.params.subscribe((params: Params) => {
        this.id = params.id;
    });

    this.obtenerTotalSumatorias();

    this.suscription = this.presupuestoService.refresh$.subscribe(() => {
      this.obtenerTotalSumatorias();
    });

    this.statuses = [
      {label: 'INGRESO', value: 'ingreso'},
      {label: 'GASTO', value: 'gasto'}
    ];
    
    this.categoriasGastos = [
      {label: 'Alimentación', value: 'Alimentación'},
      {label: 'Servicios', value: 'Servicios'},
      {label: 'Ahorro', value: 'Ahorro'},
      {label: 'Mecato', value: 'Mecato'},
      {label: 'Transporte', value: 'Transporte'},
      {label: 'Personal', value: 'Personal'},
      {label: 'Deudas', value: 'Deudas'},
      {label: 'Ropa', value: 'Ropa'},
      {label: 'Tecnología', value: 'Tecnología'},
      {label: 'Viajes', value: 'Viajes'},
      {label: 'Salud', value: 'Salud'},
      {label: 'Diversión y Ocio', value: 'Diversión y Ocio'},
    ];

    this.categoriasIngresos = [
      {label: 'Salario', value: 'Salario'},
      {label: 'Ingreso por Crédito', value: 'Ingreso por Crédito'},
      {label: 'Ingreso por Préstamos', value: 'Ingreso por Préstamos'},
      {label: 'Inversión', value: 'Inversión'},
    ];

    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'categoria', header: 'Categoria' },
      { field: 'valor', header: 'Valor' }
    ];
  }

  public obtenerTotalSumatorias(){

    if(this.date == null){
      this.date = this.fechaActual;
    }

    this.presupuestoService.getAllSumatorias(this.id).subscribe(sumatoria => this.sumatoria = sumatoria);
    this.presupuestoService.getAllPresupuestos(this.id,this.datepipe.transform(this.date, 'MM-yyyy')).
        subscribe(data => this.presupuestos = data);
    this.presupuestoService.getAllSumatoriasMes(this.id,this.datepipe.transform(this.date, 'MM-yyyy')).
        subscribe(sumatoria => this.sumatoriaMes = sumatoria);
    this.value = false;
  }

  openNew() {
    this.presupuesto = {};
    this.submitted = false;
    this.presupuestoDialog = true;
  }

  openFiltro(){
    this.presupuesto = {};
    this.submitted = false;
    this.filtroDialog = true;
  }

  deleteSelectedPresupuestos() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.presupuestos = this.presupuestos.filter(val => !this.presupuestos.includes(val));
            this.selectedPresupuestos = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Eliminado', life: 3000});
        }
    });
  }

  editPresupuesto(presupuesto: Presupuesto) {
    this.todayDate = new Date(presupuesto.fecha);
    presupuesto.fecha = this.todayDate;
    this.presupuesto = {...presupuesto};
    this.presupuestoDialog = true;
  }

  deletePresupuesto(presupuesto: Presupuesto) {
    this.confirmationService.confirm({
        message: '¿' + 'Esta seguro que desea eliminar el registro ' + presupuesto.categoria + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.presupuestos = this.presupuestos.filter(val => val.idPresupuesto !== presupuesto.idPresupuesto);
            this.presupuestoService.deleteProduct(presupuesto.idPresupuesto);
            this.presupuesto = {};
            this.messageService.add({severity:'success', summary: 'Exitoso', detail: 'Registro Eliminado', life: 3000});
        }
    });
  }

  hideDialog() {
      this.presupuestoDialog = false;
      this.submitted = false;
  }

  savePresupuesto() {
    this.submitted = true;

    if (this.presupuesto.categoria.trim) {
        if (this.presupuesto.idPresupuesto) {
            this.presupuestoService.updateProduct(this.presupuesto.idPresupuesto, this.presupuesto);
            this.presupuestos[this.findIndexById(this.presupuesto.idPresupuesto)] = this.presupuesto;   
            this.messageService.add({severity:'success', summary: 'Exitoso', detail: 'Registro Actualizado', life: 3000});
        }
        else {
            this.presupuesto.idUsuario = this.id;
            this.presupuesto.idPresupuesto = this.createId();
            this.presupuestoService.createPresupuesto(this.presupuesto).subscribe(data => this.presupuesto = data);  
            this.messageService.add({severity:'success', summary: 'Exitoso', detail: 'Registro Creado', life: 3000});
        }  
        this.presupuestos = [...this.presupuestos];
        this.presupuestoDialog = false;
        this.presupuesto = {};
    }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.presupuestos.length; i++) {
          if (this.presupuestos[i].idPresupuesto === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
    return this.presupuestos ? this.first === (this.presupuestos.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.presupuestos ? this.first === 0 : true;
  }

  filtrarFecha(){
    this.ngOnInit();
  }

}
