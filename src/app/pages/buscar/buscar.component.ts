import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FiltroConsultaDTO } from 'src/app/_dto/FiltroConsultaDTO';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { BuscarDialogoComponent } from './buscar-dialogo/buscar-dialogo.component';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;


  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });
  }

  buscar() {

    let fecha = this.form.value['fechaConsulta'];
    fecha = fecha != null ? moment(fecha).format('YYYY-MM-DDTHH:mm:ss') : '';

    let filtro = new FiltroConsultaDTO(this.form.value['dni'], this.form.value['nombreCompleto'], fecha);


    /*
     {
       dni : ''
       nombreCompleto: xxxxx
       fecha: ''
     }

     {       
       nombreCompleto: xxxxx        
     }
   */
  
    if (filtro.fechaConsulta.length === 0) {
      delete filtro.fechaConsulta;
    }

    if (filtro.dni.length === 0) {
      delete filtro.dni;
    }

    if (filtro.nombreCompleto.length === 0) {
      delete filtro.nombreCompleto
    }
  
    if (filtro.fechaConsulta != null) {
      this.consultaService.buscarFecha(filtro.fechaConsulta).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(data);
      });
    } else {
      this.consultaService.buscarOtros(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(data);
      });
    }
  }

  verDetalle(consulta: Consulta){
    this.dialog.open(BuscarDialogoComponent, {
      data: consulta
    });
  }

}
