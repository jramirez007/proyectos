import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Signo } from 'src/app/_model/signo';
import { SignoService } from 'src/app/_service/signo.service';

@Component({
  selector: 'app-signo-eliminar',
  templateUrl: './signo-eliminar.component.html',
  styleUrls: ['./signo-eliminar.component.css']
})
export class SignoEliminarComponent implements OnInit {

  signo: Signo;

  constructor(
    private dialogRef: MatDialogRef<SignoEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Signo,
    private signoService: SignoService
  ) { }

  ngOnInit(): void {
    this.signo = this.data;
  }


  eliminar(){
    if (this.signo != null && this.signo.idSigno > 0) {
      //eliminar
      this.signoService.eliminar(this.signo.idSigno).pipe(switchMap(() => {
        return this.signoService.listar();
      })).subscribe(data => {
        this.signoService.setSignoCambio(data);
        this.signoService.setMensajeCambio('SE ELIMNO');
      });
    }    
    this.cerrar();
  }



  cerrar(){
    this.dialogRef.close();
  }

}
