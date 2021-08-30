import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ingreso } from './../../models/ingreso.model';

@Injectable({
    providedIn: 'root'
})
export class IngresosService {

    constructor(
        private http: HttpClient
    ) { }

    getAllIngresos() {
        return this.http.get<Ingreso[]>(`http://localhost:9090/presupuesto/api/ingresoso/all`);
    }
}