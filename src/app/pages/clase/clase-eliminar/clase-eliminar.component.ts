import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Clase } from 'src/app/_model/clase';
import { ClaseService } from 'src/app/_service/clase.service';

@Component({
  selector: 'app-clase-eliminar',
  templateUrl: './clase-eliminar.component.html',
  styleUrls: ['./clase-eliminar.component.css']
})
export class ClaseEliminarComponent implements OnInit {

  clase: Clase;

  constructor(
    private dialogRef: MatDialogRef<ClaseEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Clase,
    private claseService: ClaseService
  ) { }

  ngOnInit(): void {
    this.clase = this.data;
  }


  eliminar(){
    if (this.clase != null && this.clase.idClase > 0) {
      //eliminar
      this.claseService.eliminar(this.clase.idClase).pipe(switchMap(() => {
        return this.claseService.listar();
      })).subscribe(data => {
        this.claseService.setClaseCambio(data);
        this.claseService.setMensajeCambio('SE ELIMNO');
      });
    }    
    this.cerrar();
  }



  cerrar(){
    this.dialogRef.close();
  }

}
