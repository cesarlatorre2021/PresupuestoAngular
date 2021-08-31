import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from '../../../core/services/gastos/presupuesto.service';
import { PrimeNGConfig } from 'primeng/api';
import { Presupuesto } from 'src/app/core/models/presupuesto.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService,ConfirmationService]
})
export class DetallePresupuestoComponent implements OnInit {

  presupuestoDialog: boolean;
  presupuestos: Presupuesto[];
  presupuesto : Presupuesto;
  selectedPresupuestos: Presupuesto[];
  submitted: boolean;
  statuses: any[];

  first = 0;
  rows = 10;

  constructor(
    private presupuestoService: PresupuestoService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.fetchGastos();
    this.statuses = [
      {label: 'INGRESO', value: 'ingreso'},
      {label: 'GASTO', value: 'gasto'}
  ];
  }

  fetchGastos() {
    this.presupuestoService.getAllPresupuestos()
    .subscribe(presupuestos => {
      this.presupuestos = presupuestos;
    });
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
    this.presupuesto = {...presupuesto};
    this.presupuestoDialog = true;
  }

  deletePresupuesto(presupuesto: Presupuesto) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + presupuesto.categoria + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.presupuestos = this.presupuestos.filter(val => val.idPresupuesto !== presupuesto.idPresupuesto);
            this.presupuesto = {};
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
            this.presupuestos[this.findIndexById(this.presupuesto.idPresupuesto)] = this.presupuesto;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.presupuesto.idPresupuesto = this.createId();
            this.presupuestos.push(this.presupuesto);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
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

}
