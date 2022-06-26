import { AddEditProdutoRendaVariavelComponent } from './../add-edit-produto-renda-variavel/add-edit-produto-renda-variavel.component';
import { ProdutoRendaVariavelService } from './../../../services/produto-renda-variavel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-produto-renda-variavel',
  templateUrl: './listar-produto-renda-variavel.component.html',
  styleUrls: ['./listar-produto-renda-variavel.component.scss']
})
export class ListarProdutoRendaVariavelComponent implements OnInit {
 
 constructor(public dialog: MatDialog, private service: ProdutoRendaVariavelService,  private toastr: ToastrService) { }

 displayedColumns: string[] = ['produtoRendaVariavelId', 'produtoRendaVariavelNome', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.ListarTodosProdutoRendaVariavel();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditProdutoRendaVariavelComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosProdutoRendaVariavel();
      }
    });

  }
  ListarTodosProdutoRendaVariavel(){
    this.service.pegarTodos().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }
  editarProdutoRendaVariavel(row : any){
    this.dialog.open(AddEditProdutoRendaVariavelComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosProdutoRendaVariavel();
      }});
  }
  apagarProdutoRendaVariavel(id: number){
    this.service.excluirProdutoRendaVariavel(id).subscribe({
      next:(res) => {
          this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
          this.ListarTodosProdutoRendaVariavel();
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
