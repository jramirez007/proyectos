import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Clase } from 'src/app/_model/clase';
import { ClaseService } from 'src/app/_service/clase.service';

@Component({
  selector: 'app-clase-edicion',
  templateUrl: './clase-edicion.component.html',
  styleUrls: ['./clase-edicion.component.css']
})
export class ClaseEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  crearClase: boolean;

  clases: Clase[];
  clases$: Observable<Clase[]>;


  idClaseSeleccionada: number;
  clase: Clase
  
  clase$ = new Subject<Clase>();  
  

  idClaseCreada: number;


  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private claseService: ClaseService
  ) { }

  ngOnInit(): void {    
    this.crearClase = false;
    this.form = new FormGroup(
      {
        'id': new FormControl(0),
        //'paciente': new FormControl(''),
        'nombre': new FormControl('')
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

    this.clases$ = this.claseService.listar();
    
  }

  private initForm(){
    if (this.edicion) {
      this.claseService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup(
          {
            'id': new FormControl(data.idClase),
            //'idPacienteSeleccionado': data.paciente.idPaciente,
            //'paciente': new FormControl(data.paciente.nombres, [Validators.required, Validators.minLength(3)]),
            'nombre': new FormControl(data.nombre),            
          });                    
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

    let clase = new Clase();
    clase.idClase = this.form.value['id'];
    
    clase.nombre = this.form.value['nombre'];


    if (!this.crearClase) {
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
        this.claseService.modificar(clase).pipe(switchMap( () => {
          return this.claseService.listar();        
        } )).subscribe(data => {
          this.claseService.setClaseCambio(data);
          this.claseService.setMensajeCambio('SE MODIFICO');
        });
      } else {
        //registrar
        this.claseService.registrar(clase).subscribe( ()=> {
          this.claseService.listar().subscribe(data => {
            this.claseService.setClaseCambio(data);
            this.claseService.setMensajeCambio('SE REGISTRO');
          });
        });
      }
      
      this.router.navigate(['clase']);
    
    }


  }


}
