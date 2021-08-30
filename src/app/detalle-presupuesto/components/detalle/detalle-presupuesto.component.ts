import { Component, OnInit } from '@angular/core';
import { GastosService } from './../../../core/services/gastos/gastos.service';
import { PrimeNGConfig } from 'primeng/api';
import { Gasto } from 'src/app/core/models/gasto.model';
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

  gastoDialog: boolean;
  gastos: Gasto[];
  gasto : Gasto;
  selectedGastos: Gasto[];
  submitted: boolean;
  statuses: any[];

  first = 0;
  rows = 10;

  constructor(
    private gastosService: GastosService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.fetchGastos();
    this.statuses = [
      {label: 'INGRESO', value: 'ingreso'},
      {label: 'GASTO', value: 'gasto'}
  ];
  }

  fetchGastos() {
    this.gastosService.getAllGastos()
    .subscribe(gastos => {
      this.gastos = gastos;
    });
  }

  openNew() {
    this.gasto = {};
    this.submitted = false;
    this.gastoDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.gastos = this.gastos.filter(val => !this.gastos.includes(val));
            this.selectedGastos = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
  }

  editProduct(gasto: Gasto) {
    this.gasto = {...gasto};
    this.gastoDialog = true;
  }

  deleteProduct(gasto: Gasto) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + gasto.categoria + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.gastos = this.gastos.filter(val => val.idGastos !== gasto.idGastos);
            this.gasto = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
      });
  }

  hideDialog() {
      this.gastoDialog = false;
      this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.gasto.categoria.trim()) {
        if (this.gasto.idGastos) {
            this.gastos[this.findIndexById(this.gasto.idGastos)] = this.gasto;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.gasto.idGastos = this.createId();
            this.gastos.push(this.gasto);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.gastos = [...this.gastos];
        this.gastoDialog = false;
        this.gasto = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.gastos.length; i++) {
        if (this.gastos[i].idGastos === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  createId(): number {
      let id = 0;
      for ( var i = 0; i < 5; i++ ) {
          id += Math.random();
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
    return this.gastos ? this.first === (this.gastos.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.gastos ? this.first === 0 : true;
  }

}
