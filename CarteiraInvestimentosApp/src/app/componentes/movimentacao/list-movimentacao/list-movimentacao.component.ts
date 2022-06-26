import { AddEditMovimentacaoComponent } from './../add-edit-movimentacao/add-edit-movimentacao.component';
import { MovimentacaoService } from './../../../services/movimentacao.service';


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-movimentacao',
  templateUrl: './list-movimentacao.component.html',
  styleUrls: ['./list-movimentacao.component.scss']
})
export class ListMovimentacaoComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: MovimentacaoService, private toastr: ToastrService) { }

  displayedColumns: string[] = ['movimentacaoId', 'valor', 'unidades', 'dataMovimentacao',
  'statusMovimentacaoId', 'rendaVariavelid','rendaFixaId', 'tesouroDiretoId', 'poupancaId' ,'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.ListarTodasMovimentacoes();

  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEditMovimentacaoComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodasMovimentacoes();
      }
    });

  }

  ListarTodasMovimentacoes(){
    this.service.ListarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });
  }

  editarPoupanca(row : any){
    this.dialog.open(AddEditMovimentacaoComponent, {
      width: '40%',
      data: row
    
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodasMovimentacoes();
      }});
  }
 apagarPoupanca(id: number){
  this.service.Excluirmovimentacao(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodasMovimentacoes();
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
