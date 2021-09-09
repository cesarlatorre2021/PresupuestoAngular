import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PresupuestoService } from '../../../core/services/gastos/presupuesto.service';
import { Presupuesto } from 'src/app/core/models/presupuesto.model';
import { Sumatoria } from 'src/app/core/models/sumatoria.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
  presupuestos: Presupuesto[];
  presupuesto : Presupuesto;
  selectedPresupuestos: Presupuesto[];
  sumatoria : Sumatoria = {};
  submitted: boolean;
  statuses: any[];
  categorias: any[];
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  valorIngreso: number = 3000000;
  cols: any[];

  first = 0;
  rows = 10;

  constructor(
    private presupuestoService: PresupuestoService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {    
    this.presupuestoService.getAllSumatorias().subscribe(sumatoria => {
      this.sumatoria = sumatoria;
      this.presupuestoService.getAllPresupuestos().then(data => this.presupuestos = data);
    });
    this.statuses = [
      {label: 'INGRESO', value: 'ingreso'},
      {label: 'GASTO', value: 'gasto'}
    ];
    this.categorias = [
      {label: 'Alimentación', value: 'Alimentación'},
      {label: 'Servicios', value: 'Servicios'},
      {label: 'Inversión', value: 'Inversión'},
      {label: 'Ahorro', value: 'Ahorro'},
      {label: 'Mecato', value: 'Mecato'},
      {label: 'Transporte', value: 'Transporte'},
      {label: 'Personal', value: 'Personal'},
      {label: 'Deudas', value: 'Deudas'},
      {label: 'Ropa', value: 'Ropa'},
      {label: 'Tecnología', value: 'Tecnología'},
      {label: 'Viajes', value: 'Viajes'},
      {label: 'Salario', value: 'Salario'},
    ];
    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'categoria', header: 'Categoria' },
      { field: 'valor', header: 'Valor' }
  ];
  }

  openNew() {
    this.presupuesto = {};
    this.submitted = false;
    this.presupuestoDialog = true;
  }

  deleteSelectedPresupuestos() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.presupuestos = this.presupuestos.filter(val => !this.presupuestos.includes(val));
            this.selectedPresupuestos = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
  }

  editPresupuesto(presupuesto: Presupuesto) {
    this.todayDate = new Date(presupuesto.fecha);
    presupuesto.fecha = this.todayDate;
    this.presupuesto = {...presupuesto};
    this.presupuestoDialog = true;
    console.log(presupuesto);
  }

  deletePresupuesto(presupuesto: Presupuesto) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + presupuesto.categoria + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.presupuestos = this.presupuestos.filter(val => val.idPresupuesto !== presupuesto.idPresupuesto);
            this.presupuestoService.deleteProduct(presupuesto.idPresupuesto);
            this.presupuesto = {};
            this.ngOnInit();
            this.ngOnInit();
            this.reload();
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
  }

  hideDialog() {
      this.presupuestoDialog = false;
      this.submitted = false;
  }

  savePresupuesto() {
    this.submitted = true;

    if (this.presupuesto.categoria.trim()) {
        if (this.presupuesto.idPresupuesto) {
            this.presupuestoService.updateProduct(this.presupuesto.idPresupuesto, this.presupuesto);
            this.presupuestos[this.findIndexById(this.presupuesto.idPresupuesto)] = this.presupuesto; 
            this.presupuestoService.getAllSumatorias().subscribe(sumatoria => {this.sumatoria = sumatoria});            
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            this.ngOnInit();
            this.reload();
        }
        else {
            this.presupuesto.idPresupuesto = this.createId();
            this.presupuestoService.createPresupuesto(this.presupuesto).then(data => this.presupuesto = data);
            this.presupuestoService.getAllSumatorias().subscribe(sumatoria => {this.sumatoria = sumatoria});     
            this.presupuestos.unshift(this.presupuesto);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            this.ngOnInit();
            this.reload();
        }

        this.presupuestos = [...this.presupuestos];
        this.sumatoria = this.sumatoria;
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

  reload(){
    this.router.navigateByUrl("/detalle/view", { skipLocationChange: true });
  }

}
