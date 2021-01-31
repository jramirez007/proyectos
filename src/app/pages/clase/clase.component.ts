import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Clase } from 'src/app/_model/clase';
import { ClaseService } from 'src/app/_service/clase.service';
import { ClaseEliminarComponent } from './clase-eliminar/clase-eliminar.component';


@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  displayedColumns = ['idClase','nombre','acciones'];
  dataSource: MatTableDataSource<Clase>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(
    private claseService : ClaseService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.claseService.listarPageable(0,10).subscribe(data => {
      //console.log(data);
      
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });

    // this.pacienteService.listar().subscribe(data => {
    //   this.crearTabla(data);
    // });
    
    this.claseService.getClaseCambio().subscribe(data =>{
      this.crearTabla(data);
    });

    this.claseService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idClase: number){
    this.claseService.eliminar(idClase).pipe(switchMap( () =>{
      return this.claseService.listar();
    } )).subscribe(data => {
      this.claseService.setClaseCambio(data);
      this.claseService.setMensajeCambio('SE ELIMINO');
    });
    
  }


  abrirEliminar(clase?: Clase) {
    let med = clase != null ? clase : new Clase();
    this.dialog.open(ClaseEliminarComponent, {
      width: '250px',
      data: med
    });
  }

  crearTabla(data: Clase[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  mostrarMas(e: any) {
    this.claseService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }


}
