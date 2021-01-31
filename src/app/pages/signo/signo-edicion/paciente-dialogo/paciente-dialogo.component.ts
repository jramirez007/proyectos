import { Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Console } from 'console';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente-dialogo',
  templateUrl: './paciente-dialogo.component.html',
  styleUrls: ['./paciente-dialogo.component.css']
})
export class PacienteDialogoComponent implements OnInit {

  form: FormGroup;
  
  paciente: Paciente;
  //@Output() idPacienteNuevo = new EventEmitter();


  constructor(
    private dialogRef: MatDialogRef<PacienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Paciente,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        'id': new FormControl(0),
        'nombres': new FormControl(''),
        'apellidos': new FormControl(''),
        'dni': new FormControl(''),
        'telefono': new FormControl(''),
        'direccion': new FormControl('')
      }
    );
    
    this.paciente = this.data;
  }

  guardar(){

    this.createPaciente();

    this.pacienteService.registrar(this.paciente).subscribe(() =>{
      this.pacienteService.listarPorDni(this.paciente.dni).subscribe(data =>{
        //console.log(data);
        this.pacienteService.pacienteRegistro.next(data);
      });
    });

    this.cerrar();



      //registrar
      // this.pacienteService.registrar(this.paciente).pipe(switchMap( ()=>{
      //   //console.log(this.paciente);        
      //   return this.pacienteService.listar();        
      // })).subscribe(data =>{    
      //   this.pacienteService.setPacienteCambio(data);
      //   this.pacienteService.setMensajeCambio('SE REGISTRO');
      // });

      // this.pacienteService.setPaciente(this.paciente);
      //   this.pacienteService.listarPorDni(this.paciente.dni).subscribe(data =>{
      //     //console.log('data='+data.idPaciente);
      //     //this.idPacienteNuevo = data.idPaciente;          
      //     this.idPacienteNuevo.emit(data.idPaciente);
      // });


      //console.log(this.paciente);


    }

    createPaciente(): void{
      this.paciente.nombres = this.form.get("nombres").value;
      this.paciente.apellidos = this.form.get("apellidos").value;
      this.paciente.direccion = this.form.get("direccion").value;
      this.paciente.dni = this.form.get("dni").value;
      this.paciente.telefono = this.form.get("telefono").value;
      //this.paciente.email = this.form.get("email").value;
    }
    
  
  cerrar(){
    this.dialogRef.close();
  }

}
