import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: string;
  roles: string[];
  roles_str: string;

  constructor(
  ) { }

  ngOnInit() {    
    const helper = new JwtHelperService();

    let access_token = sessionStorage.getItem(environment.TOKEN_NAME);

    let decodedToken = helper.decodeToken(access_token);
          
    this.usuario = decodedToken.user_name;
    this.roles =  decodedToken.authorities;


    this.roles_str="";
    for (let rol of this.roles) {
      this.roles_str = this.roles_str.concat(rol, ", ");      
    }
    this.roles_str = this.roles_str.slice(0,-2);

    console.log(this.usuario);
    console.log(this.roles_str);


  }

}
