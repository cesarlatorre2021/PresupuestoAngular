import { Component, OnInit } from '@angular/core';
import { Informacion } from '../../../core/models/informacion.model';
import { PresupuestoService } from '../../../core/services/gastos/presupuesto.service';

@Component({
  selector: 'app-informacion-detalle',
  templateUrl: './informacion-detalle.component.html',
  styleUrls: ['./informacion-detalle.component.scss']
})
export class InformacionDetalleComponent implements OnInit {

  informacion : Informacion = {};
  informaciones : Informacion[];
  cols: any[];
  data: any;
  basicData: any;
  lista: any[];

  constructor(private presupuestoService: PresupuestoService) { }

  ngOnInit() {
      this.presupuestoService.getAllInformacion().subscribe(informacion => {
        this.informaciones = informacion;

       // this.data = informacion;
        this.data = {
         labels: this.informaciones.map(informacion => informacion.categoria),
         datasets: [
            {
                data: this.informaciones.map(informacion => informacion.porcentaje),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#ccd7f6",
                    "#a87141",
                    "#005c0c",
                    "#000000"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#ccd7f6",
                    "#a87141",
                    "#005c0c",
                    "#000000"
                ]
            }]    
        };

        this.cols = [
          { field: 'categoria', header: 'Categoria'},
          { field: 'totalGrupo', header: 'Total' },
          { field: 'porcentaje', header: 'Porcentaje' }
        ];
  
        this.basicData = {
          labels: this.informaciones.map(informacion => informacion.categoria),
          datasets: [
              {
                  label: 'Gastos',
                  backgroundColor: '#47b475',
                  data: this.informaciones.map(informacion => informacion.porcentaje),
              }
          ]
        };
        
      });
  }

  generarNumero(numero){
    return (Math.random()*numero).toFixed(0);
  }
  
  colorRGB(){
    var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
    return "rgb" + coolor;
  }
  
}