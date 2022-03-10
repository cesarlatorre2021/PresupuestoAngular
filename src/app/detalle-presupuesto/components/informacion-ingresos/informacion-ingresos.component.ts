import { Component, OnInit, Input } from '@angular/core';
import { InformacionIngresos } from '../../../core/models/informacionIngresos.model';
import { PresupuestoService } from '../../../core/services/gastos/presupuesto.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informacion-ingresos',
  templateUrl: './informacion-ingresos.component.html',
  styleUrls: ['./informacion-ingresos.component.scss']
})
export class InformacionIngresosComponent implements OnInit {

  informacion : InformacionIngresos = {};
  informaciones : InformacionIngresos[];
  cols: any[];
  data: any;
  basicData: any;
  lista: any[];
  value: boolean = true;
  id: string;
  graficasDialog: boolean;
  
  constructor(
    private presupuestoService: PresupuestoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

      this.route.params.subscribe((params: Params) => {
        this.id = params.id;
      });

      this.presupuestoService.getAllInformacionIngresos(this.id).subscribe(informacion => {
        this.informaciones = informacion;
        this.value = false;
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

  graficasNew(){
    this.graficasDialog = true;
  }

  generarNumero(numero){
    return (Math.random()*numero).toFixed(0);
  }
  
  colorRGB(){
    var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
    return "rgb" + coolor;
  }

}
