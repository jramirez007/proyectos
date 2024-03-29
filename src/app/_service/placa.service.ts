import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Placa } from '../_model/placa';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PlacaService extends GenericService<Placa> {

  private placaCambio = new Subject<Placa[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/placas`
    );
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  

  getPlacaCambio(){
    return this.placaCambio.asObservable();
  }

  setPlacaCambio(placas: Placa[]){
    this.placaCambio.next(placas);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}