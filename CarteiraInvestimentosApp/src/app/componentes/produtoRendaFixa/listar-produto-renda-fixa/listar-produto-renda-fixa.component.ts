import { AddEditProdutoRendaFixaComponent } from './../add-edit-produto-renda-fixa/add-edit-produto-renda-fixa.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProdutoRendaFixaService } from 'src/app/services/produto-renda-fixa.service';

@Component({
  selector: 'app-listar-produto-renda-fixa',
  templateUrl: './listar-produto-renda-fixa.component.html',
  styleUrls: ['./listar-produto-renda-fixa.component.scss']
})
export class ListarProdutoRendaFixaComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: ProdutoRendaFixaService,  private toastr: ToastrService) { }

  displayedColumns: string[] = ['produtoRendaFixaId', 'produtoRendaFixaNome', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.ListarTodosProdutoRendaFixa();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditProdutoRendaFixaComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosProdutoRendaFixa();
      }
    });
   
  }

  ListarTodosProdutoRendaFixa(){
    this.service.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  editarProdutoRendaFixa(row : any){
    this.dialog.open(AddEditProdutoRendaFixaComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosProdutoRendaFixa();
      }});
  }
 apagarProdutoRendaFixa(id: number){
  this.service.excluirProdutoRendaFixa(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodosProdutoRendaFixa(); 
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
