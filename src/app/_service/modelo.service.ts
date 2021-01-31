import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modelo } from '../_model/modelo';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ModeloService extends GenericService<Modelo> {

  private modeloCambio = new Subject<Modelo[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/modelos`
    );
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  

  getModeloCambio(){
    return this.modeloCambio.asObservable();
  }

  setModeloCambio(modelos: Modelo[]){
    this.modeloCambio.next(modelos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}