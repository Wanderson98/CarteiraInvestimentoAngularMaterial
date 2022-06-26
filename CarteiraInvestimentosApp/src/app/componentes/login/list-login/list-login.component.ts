import { AddEditLoginComponent } from './../add-edit-login/add-edit-login.component';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-login',
  templateUrl: './list-login.component.html',
  styleUrls: ['./list-login.component.scss']
})
export class ListLoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: LoginService, private toastr: ToastrService) { }

  displayedColumns: string[] = ['loginId', 'loginEmail', 'loginSenha', 'action'];
   dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   ngOnInit(): void {
     this.ListarTodosLogin();
   }

   openDialog() {
     const dialogRef = this.dialog.open(AddEditLoginComponent,{
       width: '40%',
     }).afterClosed().subscribe(val =>{
       if(val === 'salvo'){
         this.ListarTodosLogin();
       }
     });

   }
   ListarTodosLogin(){
     this.service.ListarTodos().subscribe(result => {
     this.dataSource = new MatTableDataSource(result);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     });
   }
   editarLogin(row : any){
     this.dialog.open(AddEditLoginComponent, {
       width: '40%',
       data: row
     }).afterClosed().subscribe(val =>{
       if(val === 'atualizado'){
         this.ListarTodosLogin();
       }});
   }
   apagarLogin(id: number){
     this.service.ExcluirLogin(id).subscribe({
       next:(res) => {
           this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
           this.ListarTodosLogin();
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
