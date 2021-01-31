import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clase } from '../_model/clase';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClaseService extends GenericService<Clase> {

  private claseCambio = new Subject<Clase[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/clases`
    );
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  

  getClaseCambio(){
    return this.claseCambio.asObservable();
  }

  setClaseCambio(clases: Clase[]){
    this.claseCambio.next(clases);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}