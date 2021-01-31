import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../_model/menu';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu> {

  private menuCambio = new Subject<Menu[]>();
  
  //private menuCambio = new BehaviorSubject<Menu[]>([]);

  constructor(http: HttpClient) { 
    super(
      http,
      `${environment.HOST}/menus`
    );
  }

  listarPorUsuario(nombre: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-type', 'application/json')
    });
  }

  getMenuCambio(){
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus: Menu[]){
    //console.log(menus);
    this.menuCambio.next(menus);
  }


}
