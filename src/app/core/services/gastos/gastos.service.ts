import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gasto } from './../../models/gasto.model';

@Injectable({
    providedIn: 'root'
})
export class GastosService {

    constructor(
        private http: HttpClient
    ) { }

    getAllGastos() {
        return this.http.get<Gasto[]>(`http://localhost:9090/presupuesto/api/gastos/All`);
    }
}