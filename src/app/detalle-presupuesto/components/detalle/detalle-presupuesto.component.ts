import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../productservice';
import { Product } from './../../../product';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-detalle-presupuesto',
  templateUrl: './detalle-presupuesto.component.html',
  styleUrls: ['./detalle-presupuesto.component.scss']
})
export class DetallePresupuestoComponent implements OnInit {

  products: Product[];

 /* constructor(private productService: ProductService, private primengConfig: PrimeNGConfig) { }*/
 constructor() { }
  
  /*ngOnInit(): void {
    this.productService.getProductsSmall().then(data => this.products = data);
    this.primengConfig.ripple = true;
  }*/

   ngOnInit(): void {
  }

}
