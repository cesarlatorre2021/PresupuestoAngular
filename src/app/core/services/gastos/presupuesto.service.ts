import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Presupuesto } from '../../models/presupuesto.model';
import { Sumatoria } from '../../models/sumatoria.model';
import { Informacion } from '../../models/informacion.model';
import { InformacionIngresos } from '../../models/informacionIngresos.model';
import { environment } from './../../../../environments/environment';
import { Autenticacion } from '../../models/autenticacion.model';
import { Registro } from '../../models/registro.model';
import { Usuario } from '../../models/usuario.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PresupuestoService {

    private _refresh$ = new Subject<void>();

    constructor(
        private http: HttpClient
    ) { }

    get refresh$(){
        return this._refresh$;
    }

    getAllPresupuestos(idusuario: string, mesAnio: string) {
        return this.http.get<Presupuesto[]>(`${environment.url_api}/presupuesto/api/lista/${idusuario}/${mesAnio}`);
    }

    createPresupuesto(presupuesto: Presupuesto) {
        return this.http.post(`${environment.url_api}/presupuesto/api/save`, presupuesto)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        )
    }

    createRegistro(registro: Registro) {
        return this.http.post(`${environment.url_api}/presupuesto/api/registro/save`, registro)
        .toPromise()
        .then(presupuesto => { return presupuesto; })
    }

    deleteProduct(id: string) {
        return this.http.delete(`${environment.url_api}/presupuesto/api/delete/${id}`)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        )
        .toPromise()
        .then(presupuesto => { return presupuesto; });
    }

    updateProduct(id: string, changes: Partial<Presupuesto>) {
        return this.http.put(`${environment.url_api}/presupuesto/api/actualizar`, changes)
        .pipe(
            tap(() => {
                this._refresh$.next();
            })
        )
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

    getNombreUsuarioAutenticado(idusuario: string){
        return this.http.get<Usuario>(`${environment.url_api}/presupuesto/api/nombreUsuario/${idusuario}`);
    }
    
}