import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Presupuesto } from '../../models/presupuesto.model';
import { Sumatoria } from '../../models/sumatoria.model';
import { Informacion } from '../../models/informacion.model';
import { environment } from './../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PresupuestoService {

    constructor(
        private http: HttpClient
    ) { }

    getAllPresupuestos() {
        return this.http.get<Presupuesto[]>(`${environment.url_api}/presupuesto/api/lista`)
        .toPromise()
        .then(data => { return data; });
    }

    createPresupuesto(presupuesto: Presupuesto) {
        return this.http.post(`${environment.url_api}/presupuesto/api/save`, presupuesto)
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

    getAllSumatorias() {
        return this.http.get<Sumatoria>(`${environment.url_api}/presupuesto/api/sumatorias`);
    }

    getAllInformacion() {
        return this.http.get<Informacion[]>(`${environment.url_api}/presupuesto/api/lista/totales`);
    }
    
}