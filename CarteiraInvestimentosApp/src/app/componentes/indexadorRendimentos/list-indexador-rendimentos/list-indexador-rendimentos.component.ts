import { AddEditIndexadorRendimentosComponent } from './../add-edit-indexador-rendimentos/add-edit-indexador-rendimentos.component';
import { IndexadorService } from './../../../services/indexador.service';
import { IndexadorRendimentos } from './../../../models/indexadorRendimentos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-indexador-rendimentos',
  templateUrl: './list-indexador-rendimentos.component.html',
  styleUrls: ['./list-indexador-rendimentos.component.scss']
})
export class ListIndexadorRendimentosComponent implements OnInit {
 //indexadorRendimentosId indexadorRendimentosNome
 constructor(public dialog: MatDialog, private service: IndexadorService,  private toastr: ToastrService) { }

 displayedColumns: string[] = ['indexadorRendimentosId', 'indexadorRendimentosNome', 'action'];
 dataSource!: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 
 ngOnInit(): void {
   this.ListarTodosIndexadores();
 }

 openDialog() {
   const dialogRef = this.dialog.open(AddEditIndexadorRendimentosComponent,{
     width: '40%',
   }).afterClosed().subscribe(val =>{
     if(val === 'salvo'){
       this.ListarTodosIndexadores();
     }
   });
  
 }

 ListarTodosIndexadores(){
   this.service.ListarTodos().subscribe(result => {
   this.dataSource = new MatTableDataSource(result);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   });
 }

 editarIndexador(row : any){
   this.dialog.open(AddEditIndexadorRendimentosComponent, {
     width: '40%',
     data: row
   }).afterClosed().subscribe(val =>{
     if(val === 'atualizado'){
       this.ListarTodosIndexadores();
     }});
 }
apagarIndexador(id: number){
 this.service.ExcluirIndexadorRendimentos(id).subscribe({
   next:(res) => {
       this.toastr.error('Excluindo!', 'Excluido com Sucesso!');
       this.ListarTodosIndexadores(); 
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
