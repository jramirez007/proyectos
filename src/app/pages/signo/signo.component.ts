import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Signo } from 'src/app/_model/signo';
import { SignoService } from 'src/app/_service/signo.service';
import { SignoEliminarComponent } from './signo-eliminar/signo-eliminar.component';


@Component({
  selector: 'app-signo',
  templateUrl: './signo.component.html',
  styleUrls: ['./signo.component.css']
})
export class SignoComponent implements OnInit {

  displayedColumns = ['idSigno','paciente','fecha','temperatura','pulso','ritmoRespiratorio','acciones'];
  dataSource: MatTableDataSource<Signo>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(
    private signoService : SignoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.signoService.listarPageable(0,10).subscribe(data => {
      //console.log(data);
      
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });

    // this.pacienteService.listar().subscribe(data => {
    //   this.crearTabla(data);
    // });
    
    this.signoService.getSignoCambio().subscribe(data =>{
      this.crearTabla(data);
    });

    this.signoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idSigno: number){
    this.signoService.eliminar(idSigno).pipe(switchMap( () =>{
      return this.signoService.listar();
    } )).subscribe(data => {
      this.signoService.setSignoCambio(data);
      this.signoService.setMensajeCambio('SE ELIMINO');
    });
    
  }


  abrirEliminar(signo?: Signo) {
    let med = signo != null ? signo : new Signo();
    this.dialog.open(SignoEliminarComponent, {
      width: '250px',
      data: med
    });
  }

  crearTabla(data: Signo[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  mostrarMas(e: any) {
    this.signoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }


}
