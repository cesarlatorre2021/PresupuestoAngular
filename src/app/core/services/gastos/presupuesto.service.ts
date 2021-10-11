import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Presupuesto } from '../../models/presupuesto.model';
import { Sumatoria } from '../../models/sumatoria.model';
import { Informacion } from '../../models/informacion.model';
import { InformacionIngresos } from '../../models/informacionIngresos.model';
import { environment } from './../../../../environments/environment';
import { Autenticacion } from '../../models/autenticacion.model';
import { Registro } from '../../models/registro.model';

@Injectable({
    providedIn: 'root'
})
export class PresupuestoService {

    constructor(
        private http: HttpClient
    ) { }

    getAllPresupuestos(idusuario: string, mesAnio: string) {
        return this.http.get<Presupuesto[]>(`${environment.url_api}/presupuesto/api/lista/${idusuario}/${mesAnio}`)
        .toPromise()
        .then(data => { return data; });
    }

    createPresupuesto(presupuesto: Presupuesto) {
        return this.http.post(`${environment.url_api}/presupuesto/api/save`, presupuesto)
        .toPromise()
        .then(presupuesto => { return presupuesto; });
    }

    createRegistro(registro: Registro) {
        return this.http.post(`${environment.url_api}/presupuesto/api/registro/save`, registro)
        .toPromise()
        .then(presupuesto => { return presupuesto; });
    }

    deleteProduct(id: string) {
        return this.http.delete(`${environment.url_api}/presupuesto/api/delete/${id}`)
        .toPromise()
        .then(presupuesto => { return presupuesto; });
    }

    updateProduct(id: string, changes: Partial<Presupuesto>) {
        return this.http.put(`${environment.url_api}/presupuesto/api/actualizar`, changes)
        .toPromise()
        .then(presupuesto => { return presupuesto; });
    }

    getAllSumatorias(idusuario: string) {
        return this.http.get<Sumatoria>(`${environment.url_api}/presupuesto/api/sumatorias/${idusuario}`);
    }

    getAllSumatoriasMes(idusuario: string, mesAnio: string) {
        return this.http.get<Sumatoria>(`${environment.url_api}/presupuesto/api/sumatoriasMes/${idusuario}/${mesAnio}`);
    }

    getAllInformacion(idusuario: string, fechaInicial: string, fechaFinal: string) {
        return this.http.get<Informacion[]>(`${environment.url_api}/presupuesto/api/lista/totales/${idusuario}/${fechaInicial}/${fechaFinal}`);
    }

    getAllInformacionIngresos(idusuario: string) {
        return this.http.get<InformacionIngresos[]>(`${environment.url_api}/presupuesto/api/lista/totales/ingresos/${idusuario}`);
    }

    getAutenticacion(usuario: string, password: string){
        return this.http.get<Autenticacion>(`${environment.url_api}/presupuesto/api/autenticacion/${usuario}/${password}`);
    }
    
}