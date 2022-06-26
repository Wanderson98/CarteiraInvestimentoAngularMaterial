import { AddEditStatusComponent } from './../add-edit-status/add-edit-status.component';
import { StatusMovimentacaoService } from './../../../services/status-movimentacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listar-status',
  templateUrl: './listar-status.component.html',
  styleUrls: ['./listar-status.component.scss']
})
export class ListarStatusComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: StatusMovimentacaoService,  private toastr: ToastrService) { }

  displayedColumns: string[] = ['statusMovimentacaoId', 'statusMovimentacaoNome', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.ListarTodosStatus();
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEditStatusComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosStatus();
      }
    });
   
  }

  ListarTodosStatus(){
    this.service.ListarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  editarStatus(row : any){
    this.dialog.open(AddEditStatusComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosStatus();
      }});
  }
 apagarStatus(id: number){
  this.service.ExcluirStatusMovimentacao(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodosStatus(); 
    },
    error:()=> {
      this.toastr.warning('Algo deu errado', 'Error')
    }
  })
 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
