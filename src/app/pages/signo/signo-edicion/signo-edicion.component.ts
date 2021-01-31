import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { Signo } from 'src/app/_model/signo';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignoService } from 'src/app/_service/signo.service';
import * as moment from 'moment';
import { PacienteDialogoComponent } from './paciente-dialogo/paciente-dialogo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signo-edicion',
  templateUrl: './signo-edicion.component.html',
  styleUrls: ['./signo-edicion.component.css']
})
export class SignoEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  crearPaciente: boolean;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();

  pacientes: Paciente[];
  pacientes$: Observable<Paciente[]>;


  idPacienteSeleccionado: number;
  paciente: Paciente
  
  paciente$ = new Subject<Paciente>();  
  dni: string;

  idPacienteCreado: number;


  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signoService: SignoService,
    private pacienteService: PacienteService,
    private dialog: MatDialog    
  ) { }

  ngOnInit(): void {    
    this.crearPaciente = false;
    this.form = new FormGroup(
      {
        'id': new FormControl(0),
        //'paciente': new FormControl(''),
        'fecha': new FormControl(''),
        'temperatura': new FormControl(''),
        'pulso': new FormControl(''),
        'ritmoRespiratorio': new FormControl('')
      }
    );

    this.route.params.subscribe((data : Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();



    });    

 

    //console.log('dni 2= '+this.dni);

    // this.pacienteService.listarPorDni(this.dni).subscribe(data =>{
    //   console.log(data);
    //   this.idPacienteSeleccionado = data.idPaciente;
    // });

    this.pacientes$ = this.pacienteService.listar();
    
  }

  private initForm(){
    if (this.edicion) {
      this.signoService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup(
          {
            'id': new FormControl(data.idSigno),
            //'idPacienteSeleccionado': data.paciente.idPaciente,
            //'paciente': new FormControl(data.paciente.nombres, [Validators.required, Validators.minLength(3)]),
            'fecha': new FormControl(data.fecha, Validators.required),
            'temperatura': new FormControl(data.temperatura),
            'pulso': new FormControl(data.pulso),
            'ritmoRespiratorio': new FormControl(data.ritmoRespiratorio)
          });          
          this.idPacienteSeleccionado = data.paciente.idPaciente;
      });      
    }

  }

  get f(){
    return this.form.controls;
  }

  operar(){

    if (this.form.invalid) {
      return true;
    }

    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let signo = new Signo();
    signo.idSigno = this.form.value['id'];
    signo.paciente = paciente;

    signo.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    //signo.fecha = this.form.value['fecha'];
    signo.temperatura = this.form.value['temperatura'];
    signo.pulso = this.form.value['pulso'];
    signo.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];


    if (!this.crearPaciente) {
      if (this.edicion) {
        //modificar
        //practica comun
        // this.pacienteService.modificar(paciente).subscribe( ()=> {
        //   this.pacienteService.listar().subscribe(data => {
        //     this.pacienteService.setPacienteCambio(data);
        //     this.pacienteService.setMensajeCambio('SE MODIFICO');
        //   });
        // });
        //practica ideal
        this.signoService.modificar(signo).pipe(switchMap( () => {
          return this.signoService.listar();        
        } )).subscribe(data => {
          this.signoService.setSignoCambio(data);
          this.signoService.setMensajeCambio('SE MODIFICO');
        });
      } else {
        //registrar
        this.signoService.registrar(signo).subscribe( ()=> {
          this.signoService.listar().subscribe(data => {
            this.signoService.setSignoCambio(data);
            this.signoService.setMensajeCambio('SE REGISTRO');
          });
        });
      }
      
      this.router.navigate(['signo']);
    
    }
    else{
      this.pacienteService.pacienteRegistro.subscribe(data =>{     
        console.log('idPaciente= '+data.idPaciente); 
        //paciente.idPaciente = data.idPaciente;
        this.pacientes$ = this.pacienteService.listar();
        this.idPacienteSeleccionado =  data.idPaciente;        
        console.log('idPacienteSeleccionado= '+this.idPacienteSeleccionado);
      });  
    }


  }


  
  crearNuevoPaciente(){
    this.crearPaciente = true;
    let paciente = new Paciente();
    this.dialog.open(PacienteDialogoComponent, {
      width: '350px',
      data: paciente
    });      
  }


  funNuevoPaciente(e: any){
    console.log('e='+e);
    //this.idPacienteSeleccionado = e;
  }

}
