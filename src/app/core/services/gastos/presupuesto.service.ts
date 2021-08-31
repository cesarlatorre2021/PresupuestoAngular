import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Presupuesto } from '../../models/presupuesto.model';

@Injectable({
    providedIn: 'root'
})
export class PresupuestoService {

    constructor(
        private http: HttpClient
    ) { }

    getAllPresupuestos() {
        return this.http.get<Presupuesto[]>(`http://localhost:9090/presupuesto/api/lista`);
    }
}