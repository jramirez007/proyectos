import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico-eliminar',
  templateUrl: './medico-eliminar.component.html',
  styleUrls: ['./medico-eliminar.component.css']
})
export class MedicoEliminarComponent implements OnInit {

  medico: Medico;

  constructor(
    private dialogRef: MatDialogRef<MedicoEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.medico = this.data;
  }


  eliminar(){
    if (this.medico != null && this.medico.idMedico > 0) {
      //eliminar
      this.medicoService.eliminar(this.medico.idMedico).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('SE ELIMNO');
      });
    }    
    this.cerrar();
  }



  cerrar(){
    this.dialogRef.close();
  }

}
