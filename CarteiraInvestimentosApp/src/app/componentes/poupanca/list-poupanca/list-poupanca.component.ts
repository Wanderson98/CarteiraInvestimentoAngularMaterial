import { CadastroComponent } from './../cadastro/cadastro.component';
import { AddEditPoupancaComponent } from './../add-edit-poupanca/add-edit-poupanca.component';
import { PoupancaService } from './../../../services/poupanca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-poupanca',
  templateUrl: './list-poupanca.component.html',
  styleUrls: ['./list-poupanca.component.scss']
})
export class ListPoupancaComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: PoupancaService, private toastr: ToastrService) { }

  displayedColumns: string[] = ['poupancaId', 'valorTotalInvestido', 'valorTotal','rendimento',
  'isActive', 'carteiraNome','bancoNome', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.ListarTodosPoupanca();

  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEditPoupancaComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosPoupanca();
      }
    });

  }
  
  openDialogCadastro(){
    const dialogRef = this.dialog.open(CadastroComponent,{
      width: '40%',
    }).afterClosed().subscribe(val =>{
      if(val === 'salvo'){
        this.ListarTodosPoupanca();
      }
    });
  }
  ListarTodosPoupanca(){
    this.service.pegarTodosValor().subscribe(result => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  editarPoupanca(row : any){
    this.dialog.open(AddEditPoupancaComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'atualizado'){
        this.ListarTodosPoupanca();
      }});
  }
 apagarPoupanca(id: number){
  this.service.excluirPoupanca(id).subscribe({
    next:(res) => {
        this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
        this.ListarTodosPoupanca();
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
