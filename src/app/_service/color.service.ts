import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../_model/color';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService extends GenericService<Color> {

  private colorCambio = new Subject<Color[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http : HttpClient) { 
    super(
      http,
      `${environment.HOST}/colores`
    );
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  

  getColorCambio(){
    return this.colorCambio.asObservable();
  }

  setColorCambio(colores: Color[]){
    this.colorCambio.next(colores);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}