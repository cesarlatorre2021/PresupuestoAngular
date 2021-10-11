import { Component, OnInit, Input } from '@angular/core';
import { Informacion } from '../../../core/models/informacion.model';
import { PresupuestoService } from '../../../core/services/gastos/presupuesto.service';
import { Params, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  value: boolean = true;
  fitroDialog: boolean = true;
  id: string;
  rangeDates: Date[];
  fecha = new Date();
  fechaInicialString =  '01-01-' + this.fecha.getFullYear();
  fechaActualString = this.datepipe.transform(this.fecha, 'dd-MM-YYYY');

  constructor(
    private presupuestoService: PresupuestoService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {

      console.log("Fecha Inicial " + this.fechaInicialString);
      console.log("Fecha Actual " + this.fechaActualString);

      this.route.params.subscribe((params: Params) => {
        this.id = params.id;
      });

      this.presupuestoService.getAllInformacion(this.id,this.fechaInicialString,this.fechaActualString).subscribe(informacion => {
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

  filtrar() {

    console.log("Lenth: " + this.rangeDates.length);

    if(this.rangeDates[1] == null){
      this.fechaInicialString = this.datepipe.transform(this.rangeDates[0], 'dd-MM-YYYY')
      this.fechaActualString = this.datepipe.transform(this.rangeDates[0], 'dd-MM-YYYY')
    }else{
      this.fechaInicialString = this.datepipe.transform(this.rangeDates[0], 'dd-MM-YYYY')
      this.fechaActualString = this.datepipe.transform(this.rangeDates[1], 'dd-MM-YYYY')
    }

    console.log("A: " + this.fechaInicialString);
    console.log("B: " + this.fechaActualString);
    this.reload();
  }

  generarNumero(numero){
    return (Math.random()*numero).toFixed(0);
  }
  
  colorRGB(){
    var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
    return "rgb" + coolor;
  }

  reload(){
    this.fitroDialog = false;
    this.ngOnInit();
  }
  
}