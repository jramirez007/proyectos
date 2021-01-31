import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../_model/marca';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends GenericService<Marca> {

  private marcaCambio = new Subject<Marca[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/marcas`
    );
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  

  getMarcaCambio(){
    return this.marcaCambio.asObservable();
  }

  setMarcaCambio(marcas: Marca[]){
    this.marcaCambio.next(marcas);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}